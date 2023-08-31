import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { getRegisters } from '../../functions/admin';
import redirect from '../../utils/redirect';

const HomeAdmin = () => {
    const [registers, setRegisters] = useState({
        nrcontacts: 0,
        nrmenus: 0,
        nrreservations: 0,
        nrusers: 0,
    });

    useEffect(() => {
        getRegisters()
            .then((res) => {
                setRegisters(res[0]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <AdminLayout home>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Tela Inicial</h1>
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
                    <div className="row">
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div
                                className="info-box"
                                onClick={() => redirect('/admin/reservations')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="info-box-icon bg-aqua">
                                    <i className="ion ion-ios-calendar"></i>
                                </span>

                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Reservas
                                    </span>
                                    <span className="info-box-number">
                                        {registers.nrreservations}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div
                                className="info-box"
                                onClick={() => redirect('/admin/contacts')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="info-box-icon bg-red">
                                    <i className="ion ion-ios-chatboxes"></i>
                                </span>

                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Contatos
                                    </span>
                                    <span className="info-box-number">
                                        {registers.nrcontacts}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="clearfix visible-sm-block"></div>

                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div
                                className="info-box"
                                onClick={() => redirect('/admin/menus')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="info-box-icon bg-green">
                                    <i className="fa fa-cutlery"></i>
                                </span>

                                <div className="info-box-content">
                                    <span className="info-box-text">Menu</span>
                                    <span className="info-box-number">
                                        {registers.nrmenus}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div
                                className="info-box"
                                onClick={() => redirect('/admin/users')}
                                style={{ cursor: 'pointer' }}
                            >
                                <span className="info-box-icon bg-yellow">
                                    <i className="ion ion-ios-people-outline"></i>
                                </span>

                                <div className="info-box-content">
                                    <span className="info-box-text">
                                        Usuários
                                    </span>
                                    <span className="info-box-number">
                                        {registers.nrusers}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default HomeAdmin;
