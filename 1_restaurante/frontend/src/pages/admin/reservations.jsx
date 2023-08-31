import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import {
    deleteReservation,
    getReservations,
    updateReservation,
} from '../../functions/admin';
import format from '../../utils/format';
import Message from '../../components/widget/Message';
import { handleSubmitReservation } from '../../functions/app';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function AdminReservations() {
    const [reservations, setReservations] = useState([]);
    const [visibleModalNewReservation, setVisibleModalNewReservation] =
        useState(false);
    const [visibleModalEditReservation, setVisibleModalEditReservation] =
        useState(false);
    const [editReservation, setEditReservation] = useState({
        id: '',
        name: '',
        email: '',
        people: '',
        date: '',
        time: '',
    });
    const [filter, setFilter] = useState({ from: '', to: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [numberPages, setNumberPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState({
        labels: [''],
        values: [0],
    });

    useEffect(() => {
        getReservations(filter.from, filter.to, currentPage)
            .then((res) => {
                setData({
                    labels: res.graphics.labels,
                    values: res.graphics.values,
                });
                computePages(res);
                setReservations(res.reservations);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const renderReservations = () => {
        const data = reservations ?? [];
        return data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.people}</td>
                <td>{format.date(item.date)}</td>
                <td>{item.time}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-xs btn-info btn-update"
                        data-toggle="modal"
                        data-target="#modal-update"
                        onClick={() => {
                            setEditReservation(item);
                            setVisibleModalEditReservation(true);
                        }}
                    >
                        <i className="fa fa-pencil"></i> Editar
                    </button>
                    &nbsp;
                    <button
                        type="button"
                        className="btn btn-xs btn-danger btn-delete"
                        data-id={item.id}
                        onClick={handleDeleteReservation}
                    >
                        <i className="fa fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    const renderPages = () => {
        return (
            <>
                <li>
                    <a href="#" onClick={() => handleSetCurrentPage('-')}>
                        «
                    </a>
                </li>
                {currentPage <= 2 ? (
                    false
                ) : (
                    <li>
                        <a
                            href="#"
                            onClick={() => handleSetCurrentPage('-', 2)}
                        >
                            {currentPage - 2}
                        </a>
                    </li>
                )}
                {currentPage <= 1 ? (
                    false
                ) : (
                    <li>
                        <a href="#" onClick={() => handleSetCurrentPage('-')}>
                            {currentPage - 1}
                        </a>
                    </li>
                )}
                <li className="active">
                    <a
                        href="#"
                        onClick={() => handleSetCurrentPage('=', currentPage)}
                    >
                        {currentPage}
                    </a>
                </li>
                {currentPage + 1 <= numberPages ? (
                    <li>
                        <a href="#" onClick={() => handleSetCurrentPage('+')}>
                            {currentPage + 1}
                        </a>
                    </li>
                ) : (
                    false
                )}
                {currentPage + 2 <= numberPages ? (
                    <li>
                        <a
                            href="#"
                            onClick={() => handleSetCurrentPage('+', 2)}
                        >
                            {currentPage + 2}
                        </a>
                    </li>
                ) : (
                    false
                )}

                <li>
                    <a href="#" onClick={() => handleSetCurrentPage('+')}>
                        »
                    </a>
                </li>
            </>
        );
    };

    const handleDeleteReservation = (e) => {
        deleteReservation(e.target.dataset.id)
            .then(() => {
                getReservations(filter.from, filter.to, currentPage)
                    .then((res) => {
                        setData({
                            labels: res.graphics.labels,
                            values: res.graphics.values,
                        });
                        computePages(res);
                        setReservations(res.reservations);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmitNewReservation = (e) => {
        handleSubmitReservation(e)
            .then((res) => {
                setError('');
                setSuccess(res);
                setVisibleModalNewReservation(false);
                setTimeout(() => {
                    setSuccess('');
                }, 3000);
                getReservations(filter.from, filter.to, currentPage)
                    .then((res) => {
                        setData({
                            labels: res.graphics.labels,
                            values: res.graphics.values,
                        });
                        computePages(res);
                        setReservations(res.reservations);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
            });
    };

    const handleSubmitUpdateReservation = (e) => {
        e.preventDefault();

        updateReservation(editReservation)
            .then((success) => {
                getReservations(filter.from, filter.to, currentPage)
                    .then((res) => {
                        setData({
                            labels: res.graphics.labels,
                            values: res.graphics.values,
                        });
                        computePages(res);
                        setReservations(res.reservations);
                        setError('');
                        setSuccess(success);
                        setEditReservation({
                            id: '',
                            name: '',
                            email: '',
                            people: '',
                            date: '',
                            time: '',
                        });
                        setVisibleModalEditReservation(false);
                        setTimeout(() => {
                            setSuccess('');
                        }, 3000);
                    })
                    .catch((err) => {
                        setSuccess('');
                        setError(err);
                    });
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
            });
    };

    const handleSubmitGetReservations = (e) => {
        e.preventDefault();
        const { from, to } = format.getInputsValues(e.target);
        getReservations(from, to, 1)
            .then((res) => {
                setData({
                    labels: res.graphics.labels,
                    values: res.graphics.values,
                });
                computePages(res);
                setCurrentPage(1);
                setReservations(res.reservations);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSetCurrentPage = (type, value = 1) => {
        let page = currentPage;
        // colocar para buscar os items de 10 em 10
        switch (type) {
            case '-':
                if (currentPage <= 1) {
                    setCurrentPage(1);
                    page = 1;
                } else {
                    setCurrentPage(currentPage - value);
                    page = page - value;
                }
                break;
            case '=':
                setCurrentPage(value);
                page = value;
                break;
            default:
                if (currentPage >= numberPages) {
                    setCurrentPage(numberPages);
                    page = numberPages;
                } else {
                    setCurrentPage(currentPage + value);
                    page = page + value;
                }
                break;
        }

        getReservations(filter.from, filter.to, page)
            .then((res) => {
                setData({
                    labels: res.graphics.labels,
                    values: res.graphics.values,
                });
                computePages(res);
                setReservations(res.reservations);
            })
            .catch((err) => console.log(err));
    };

    const computePages = (res) => {
        let totalItems = res.count[0]['COUNT(*)'];
        if (Number.isInteger(totalItems / 10)) {
            const pages = parseInt(+totalItems / 10);
            if (currentPage > pages) {
                setCurrentPage(pages);
            }
            return setNumberPages(pages);
        } else {
            const pages = parseInt(+totalItems / 10 + 1);
            if (currentPage > pages) {
                setCurrentPage(pages);
            }
            return setNumberPages(pages);
        }
    };

    return (
        <AdminLayout reservations>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Reservas</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/admin">
                                <i className="fa fa-home"></i> Home
                            </a>
                        </li>
                        <li className="active">Reservas</li>
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
                                    setVisibleModalNewReservation(
                                        !visibleModalNewReservation
                                    )
                                }
                            >
                                <i className="fa fa-plus"></i>
                                Novo
                            </a>
                        </div>
                        <div>
                            <Line
                                options={{ responsive: true }}
                                data={{
                                    labels: data.labels,
                                    datasets: [
                                        {
                                            data: data.values,
                                            label: 'Reservas',
                                            backgroundColor: 'rgb(54,162,235)',
                                            borderColor: 'rgb(54,162,235)',
                                            fill: true,
                                            pointBackgroundColor: '#000',
                                        },
                                    ],
                                }}
                                height={40}
                                width={100}
                            />
                        </div>
                        <div className="box-header" style={{ height: '44px' }}>
                            <div className="box-tools">
                                <form onSubmit={handleSubmitGetReservations}>
                                    <div
                                        className="form-group"
                                        style={{
                                            width: '182px',
                                            float: 'left',
                                        }}
                                    >
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                <i className="fa fa-calendar"></i>
                                            </div>
                                            <input
                                                type="date"
                                                name="from"
                                                value={filter.from}
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        from: e.target.value,
                                                    })
                                                }
                                                className="form-control unstyled"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="form-group"
                                        style={{
                                            width: '182px',
                                            float: 'left',
                                        }}
                                    >
                                        <div className="input-group">
                                            <div className="input-group-addon">
                                                até
                                            </div>
                                            <input
                                                type="date"
                                                name="to"
                                                value={filter.to}
                                                onChange={(e) =>
                                                    setFilter({
                                                        ...filter,
                                                        to: e.target.value,
                                                    })
                                                }
                                                className="form-control unstyled"
                                            />
                                        </div>
                                    </div>
                                    <div
                                        className="form-group"
                                        style={{
                                            float: 'left',
                                            marginLeft: '7px',
                                        }}
                                    >
                                        <button
                                            type="submit"
                                            className="btn btn-default"
                                        >
                                            OK
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="box-body no-padding">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}>#</th>
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Pessoas</th>
                                        <th>Data</th>
                                        <th>Hora</th>
                                        <th style={{ minWidth: '134px' }}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderReservations()}</tbody>
                            </table>
                        </div>
                        <div className="box-footer clearfix">
                            <ul className="pagination pagination-sm no-margin pull-right">
                                {renderPages()}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>

            <div
                className={`modal ${
                    visibleModalNewReservation ? 'show' : 'fade'
                }`}
                id="modal-create"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00a65a' }}
                    >
                        <form onSubmit={handleSubmitNewReservation}>
                            <div className="modal-header">
                                <Message error={error} success={success} />
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() =>
                                        setVisibleModalNewReservation(
                                            !visibleModalNewReservation
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Nova Reserva</h4>
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
                                    <label htmlFor="inputPeopleCreate">
                                        Pessoas
                                    </label>
                                    <select
                                        id="inputPeopleCreate"
                                        name="people"
                                        className="form-control"
                                    >
                                        <option value="">
                                            {' '}
                                            -- selecione --{' '}
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5+</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDateCreate">
                                        Data
                                    </label>
                                    <input
                                        type="date"
                                        id="inputDateCreate"
                                        name="date"
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputTimeCreate">
                                        Hora
                                    </label>
                                    <input
                                        type="time"
                                        id="inputTimeCreate"
                                        name="time"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-default pull-left"
                                    data-dismiss="modal"
                                    onClick={() =>
                                        setVisibleModalNewReservation(
                                            !visibleModalNewReservation
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
                className={`modal ${
                    visibleModalEditReservation ? 'show' : 'fade'
                }`}
                id="modal-update"
            >
                <div className="modal-dialog">
                    <div
                        className="modal-content"
                        style={{ borderTop: '3px solid #00c0ef' }}
                    >
                        <form onSubmit={handleSubmitUpdateReservation}>
                            <input
                                type="hidden"
                                name="id"
                                value={editReservation.id}
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
                                        setVisibleModalEditReservation(
                                            !visibleModalEditReservation
                                        )
                                    }
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Editar Reserva</h4>
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
                                        value={editReservation.name}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
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
                                        value={editReservation.email}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputPeopleUpdate">
                                        Pessoas
                                    </label>
                                    <select
                                        id="inputPeopleUpdate"
                                        name="people"
                                        className="form-control"
                                        value={editReservation.people}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                people: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="">
                                            {' '}
                                            -- selecione --{' '}
                                        </option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5+</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputDateUpdate">
                                        Data
                                    </label>
                                    <input
                                        type="date"
                                        id="inputDateUpdate"
                                        name="date"
                                        className="form-control"
                                        value={format.date(
                                            editReservation.date
                                        )}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                date: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputTimeUpdate">
                                        Hora
                                    </label>
                                    <input
                                        type="time"
                                        id="inputTimeUpdate"
                                        name="time"
                                        className="form-control"
                                        value={editReservation.time}
                                        onChange={(e) =>
                                            setEditReservation({
                                                ...editReservation,
                                                time: e.target.value,
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
                                    onClick={() => {
                                        setVisibleModalEditReservation(
                                            !visibleModalEditReservation
                                        );
                                        setEditReservation({
                                            id: '',
                                            name: '',
                                            email: '',
                                            people: '',
                                            date: '',
                                            time: '',
                                        });
                                    }}
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
}

export default AdminReservations;
