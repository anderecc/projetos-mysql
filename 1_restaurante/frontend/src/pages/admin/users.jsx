import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import {
    addUser,
    deleteUser,
    getUsers,
    updateUser,
    updateUserPassword,
} from '../../functions/admin';
import format from '../../utils/format';
import Message from '../../components/widget/Message';

const AdminUsers = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [users, setUsers] = useState([]);
    const [visibleModalNewUser, setVisibleModalNewUser] = useState(false);
    const [visibleModalEditUser, setVisibleModalEditUser] = useState(false);
    const [visibleModalEditPassword, setVisibleModalEditPassword] =
        useState(false);
    const [editUser, setEditUser] = useState({
        name: '',
        email: '',
        id: '',
    });

    useEffect(() => {
        getUsers()
            .then((res) => setUsers(res))
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteUser = (id) => {
        deleteUser(id)
            .then((res) => {
                console.log(res);
                getUsers()
                    .then((res) => setUsers(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmitAddUser = (e) => {
        e.preventDefault();
        addUser(format.getInputsValues(e.target))
            .then((res) => {
                setError('');
                setSuccess(res);
                setVisibleModalNewUser(false);
                format.resetInputsValues(e.target);
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
                getUsers()
                    .then((res) => setUsers(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
            });
    };

    const handleSubmitUpdateUser = (e) => {
        e.preventDefault();
        updateUser(format.getInputsValues(e.target))
            .then((res) => {
                setError('');
                setSuccess(res);
                setVisibleModalEditUser(false);
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
                getUsers()
                    .then((res) => setUsers(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
                console.log(err);
            });
    };

    const handleSubmitEditPassword = (e) => {
        e.preventDefault();
        updateUserPassword(editUser.id, format.getInputsValues(e.target))
            .then((res) => {
                setError('');
                setSuccess(res);
                setVisibleModalEditPassword(false);
                format.resetInputsValues(e.target);
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
            });
    };

    const renderUsers = () => {
        const data = users ?? [];
        return data.map((user, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-xs btn-info"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => {
                            setVisibleModalEditUser(!visibleModalEditUser);
                            setEditUser(user);
                        }}
                    >
                        <i className="fa fa-pencil"></i> Editar
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-xs btn-warning btn-update"
                        data-toggle="modal"
                        data-target="#modal-update-password"
                        onClick={() => {
                            setEditUser(user);
                            setVisibleModalEditPassword(
                                !visibleModalEditPassword
                            );
                        }}
                    >
                        <i className="fa fa-lock"></i> Alterar Senha
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-xs btn-danger btn-delete"
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        <i className="fa fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <AdminLayout users>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Usuários</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/admin">
                                <i className="fa fa-home"></i> Home
                            </a>
                        </li>
                        <li className="active">Usuários</li>
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
                                onClick={() =>
                                    setVisibleModalNewUser(!visibleModalNewUser)
                                }
                            >
                                <i className="fa fa-plus"></i> Novo
                            </a>
                        </div>
                        <div className="box-body no-padding">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}>#</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th style={{ minWidth: '134px' }}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderUsers()}</tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>

            <div
                className={`modal ${
                    visibleModalEditPassword ? 'show' : 'fade'
                }`}
                id="modal-update-password"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #f39c12' }}
                    >
                        <form onSubmit={handleSubmitEditPassword}>
                            <input
                                type="hidden"
                                name="id"
                                value={editUser.id}
                                readOnly
                            />
                            <div className="modal-header">
                                <Message error={error} success={success} />

                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        setVisibleModalEditPassword(
                                            !visibleModalEditPassword
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Alterar Senha</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputPassword">
                                        Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        name="password"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordConfirm">
                                        Confirmar Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPasswordConfirm"
                                        name="passwordConfirm"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default pull-left"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        setVisibleModalEditPassword(
                                            !visibleModalEditPassword
                                        )
                                    }
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-warning"
                                >
                                    Salvar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div
                className={`modal ${visibleModalNewUser ? 'show' : 'fade'}`}
                id="modal-create"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00a65a' }}
                    >
                        <form onSubmit={handleSubmitAddUser}>
                            <div className="modal-header">
                                <Message error={error} success={success} />
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        setVisibleModalNewUser(
                                            !visibleModalNewUser
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Nova Usuário</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputNameCreate">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNameCreate"
                                        name="name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmailCreate">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmailCreate"
                                        name="email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPasswordCreate">
                                        Senha
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPasswordCreate"
                                        name="password"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default pull-left"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        setVisibleModalNewUser(
                                            !visibleModalNewUser
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
                className={`modal ${visibleModalEditUser ? 'show' : 'fade'}`}
                id="modal-update"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00c0ef' }}
                    >
                        <form onSubmit={handleSubmitUpdateUser}>
                            <input
                                type="hidden"
                                name="id"
                                value={editUser.id}
                                readOnly
                            />
                            <div className="modal-header">
                                <Message error={error} success={success} />
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        setVisibleModalEditUser(
                                            !visibleModalEditUser
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Editar Usuário</h4>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="inputNameUpdate">
                                        Nome
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputNameUpdate"
                                        name="name"
                                        value={editUser.name}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputEmailUpdate">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmailUpdate"
                                        name="email"
                                        value={editUser.email}
                                        onChange={(e) =>
                                            setEditUser({
                                                ...editUser,
                                                email: e.target.value,
                                            })
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
                                        setVisibleModalEditUser(
                                            !visibleModalEditUser
                                        )
                                    }
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

export default AdminUsers;
