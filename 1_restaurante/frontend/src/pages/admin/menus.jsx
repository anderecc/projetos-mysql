import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import format from '../../utils/format';
import {
    addMenu,
    deleteImage,
    deleteMenu,
    getMenus,
    updateMenu,
    uploadImage,
} from '../../functions/admin';
import Message from '../../components/widget/Message';

const AdminMenus = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [visibleModalCreate, setVisibleModalCreate] = useState(false);
    const [visibleModalEdit, setVisibleModalEdit] = useState(false);
    const [menus, setMenus] = useState([]);
    const [editMenu, setEditMenu] = useState({
        title: '',
        description: '',
        price: 0,
        photo: '',
        id: '',
    });

    useEffect(() => {
        getMenus()
            .then((res) => {
                setMenus(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderMenus = () => {
        const data = menus ?? [];
        return data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>
                    <img
                        src={
                            item.photo
                                ? item.photo
                                : '/images/admin/boxed-bg.jpg'
                        }
                        alt=""
                        style={{ height: '18px' }}
                    />
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{format.toCurrency(+item.price)}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-xs btn-info btn-update"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => {
                            setVisibleModalEdit(!visibleModalEdit);
                            setEditMenu(item);
                        }}
                    >
                        <i className="fa fa-pencil"></i> Editar
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-xs btn-danger btn-delete"
                        onClick={() => handleDeleteMenu(item)}
                    >
                        <i className="fa fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    const handleDeleteMenu = (menu) => {
        if (menu.photo === '/images/admin/boxed-bg.jpg') {
            deleteMenu(menu.id)
                .then(() => {
                    getMenus()
                        .then((res) => setMenus(res))
                        .catch((err) => console.log(err));
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            deleteImage(menu.photo)
                .then(() => {
                    deleteMenu(menu.id)
                        .then(() =>
                            getMenus()
                                .then((res) => setMenus(res))
                                .catch((err) => console.log(err))
                        )
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        }
    };

    const handleSubmitNewMenu = (e) => {
        const fnSuccess = (res) => {
            format.resetInputsValues(e.target);
            setError('');
            setSuccess(res);
            document.getElementById('modalPreviewPhotoNewMenu').src =
                '/images/admin/boxed-bg.jpg';
            setVisibleModalCreate(false);
            setTimeout(() => {
                setSuccess('');
            }, 3000);
            getMenus()
                .then((res) => setMenus(res))
                .catch((err) => console.log(err));
        };

        e.preventDefault();
        const values = format.getInputsValues(e.target);
        if (values.photo) {
            uploadImage(values.photo)
                .then((res) =>
                    addMenu({ ...values, photo: res })
                        .then((res) => {
                            fnSuccess(res);
                        })
                        .catch((err) => {
                            setSuccess('');
                            setError(err);
                        })
                )
                .catch((err) => {
                    setSuccess('');
                    setError(err);
                });
        } else {
            addMenu(format.getInputsValues(e.target))
                .then((res) => {
                    fnSuccess(res);
                })
                .catch((err) => {
                    setSuccess('');
                    setError(err);
                });
        }
    };

    const handleSubmitUpdateMenu = (e) => {
        const fnSuccess = (res) => {
            setError('');
            setSuccess(res);
            document.getElementById('modalPreviewPhotoEditMenu').src =
                '/images/admin/boxed-bg.jpg';
            setVisibleModalEdit(false);
            setTimeout(() => {
                setSuccess('');
            }, 3000);
            getMenus()
                .then((res) => setMenus(res))
                .catch((err) => console.log(err));
        };

        e.preventDefault();

        const values = format.getInputsValues(e.target);
        //ver se tem foto e manter ou atualizar a imagem também
        if (typeof values.photo === 'string') {
            updateMenu(values)
                .then((res) => {
                    fnSuccess(res);
                })
                .catch((err) => {
                    setSuccess('');
                    setError(err);
                });
        } else {
            uploadImage(values.photo)
                .then((res) =>
                    updateMenu({ ...values, photo: res })
                        .then((res) => {
                            fnSuccess(res);
                        })
                        .catch((err) => {
                            setSuccess('');
                            setError(err);
                        })
                )
                .catch((err) => {
                    setSuccess('');
                    setError(err);
                });
        }
    };

    const handleResetModal = () => {
        setVisibleModalEdit(!visibleModalEdit);
        setEditMenu({
            title: '',
            description: '',
            price: 0,
            photo: '',
        });
    };

    return (
        <AdminLayout menus>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Menu</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/admin">
                                <i className="fa fa-home"></i> Home
                            </a>
                        </li>
                        <li className="active">Menu</li>
                    </ol>
                </section>

                <section className="content container-fluid">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Lista</h3>
                            <a
                                href="#"
                                className="btn btn-xs pull-right btn-success"
                                data-toggle="modal"
                                data-target="#modal-create"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setVisibleModalCreate(!visibleModalCreate);
                                }}
                            >
                                <i className="fa fa-plus"></i> Novo
                            </a>
                        </div>
                        <div className="box-body no-padding ">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}>#</th>
                                        <th>Foto</th>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Preço</th>
                                        <th style={{ minWidth: '134px' }}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderMenus()}</tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <div
                className={`modal ${visibleModalCreate ? 'show' : 'fade'}`}
                id="modal-create"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00a65a' }}
                    >
                        <form onSubmit={handleSubmitNewMenu}>
                            <div className="modal-header">
                                <Message error={error} success={success} />
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        setVisibleModalCreate(
                                            !visibleModalCreate
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Novo Menu</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputTitleCreate">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTitleCreate"
                                        name="title"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescriptionCreate">
                                        Descrição
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="inputDescriptionCreate"
                                        name="description"
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPriceCreate">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className="form-control"
                                        id="inputPriceCreate"
                                        name="price"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPhotoCreate">
                                        Foto
                                    </label>
                                    <img
                                        style={{
                                            maxWidth: '128px',
                                            maxHeight: '128px',
                                            display: 'block',
                                        }}
                                        id="modalPreviewPhotoNewMenu"
                                        src="/images/admin/boxed-bg.jpg"
                                    />
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputPhotoCreate"
                                        name="photo"
                                        onChange={(e) =>
                                            format.imageToBase64(
                                                e,
                                                'modalPreviewPhotoNewMenu'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default pull-left"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        setVisibleModalCreate(
                                            !visibleModalCreate
                                        )
                                    }
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div
                className={`modal ${visibleModalEdit ? 'show' : 'fade'}`}
                id="modal-update"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00c0ef' }}
                    >
                        <form onSubmit={handleSubmitUpdateMenu}>
                            <input
                                type="hidden"
                                name="id"
                                value={editMenu.id}
                                readOnly
                            />
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleResetModal}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Editar Menu</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputTitleUpdate">
                                        Título
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTitleUpdate"
                                        name="title"
                                        value={editMenu.title}
                                        onChange={(e) =>
                                            setEditMenu({
                                                ...editMenu,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDescriptionUpdate">
                                        Descrição
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="inputDescriptionUpdate"
                                        name="description"
                                        value={editMenu.description}
                                        onChange={(e) =>
                                            setEditMenu({
                                                ...editMenu,
                                                description: e.target.value,
                                            })
                                        }
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPriceUpdate">
                                        Preço
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputPriceUpdate"
                                        name="price"
                                        value={editMenu.price}
                                        onChange={(e) =>
                                            setEditMenu({
                                                ...editMenu,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPhotoUpdate">
                                        Foto
                                    </label>
                                    <img
                                        style={{
                                            maxWidth: '128px',
                                            maxHeight: '128px',
                                            display: 'block',
                                        }}
                                        src={editMenu.photo}
                                        id="modalPreviewPhotoEditMenu"
                                    />
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="inputPhotoUpdate"
                                        name="photo"
                                        onChange={(e) =>
                                            format.imageToBase64(
                                                e,
                                                'modalPreviewPhotoEditMenu'
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default pull-left"
                                    data-dismiss="modal"
                                    onClick={handleResetModal}
                                >
                                    Cancelar
                                </button>
                                <button type="submit" className="btn btn-info">
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminMenus;
