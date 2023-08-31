import { useState } from 'react';
import { logOut } from '../../functions/admin';
import redirect from '../../utils/redirect';
import { useSelector } from 'react-redux';

const AdminLayout = ({
    children,
    home,
    contacts,
    users,
    menus,
    emails,
    reservations,
}) => {
    const [visibleUser, setVisibleUser] = useState(false);

    const admin = useSelector((state) => state.admin);

    const handleSubmitLogOut = (e) => {
        e.preventDefault();
        logOut()
            .then(() => redirect('/admin/login'))
            .catch((err) => alert(err));
    };

    return (
        <div className="hold-transition skin-blue sidebar-mini">
            <div className="wrapper">
                <header className="main-header">
                    <a href="/admin" className="logo">
                        <span className="logo-mini">HCODE</span>
                        <span className="logo-lg">HCODE</span>
                    </a>

                    <nav className="navbar navbar-static-top" role="navigation">
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                <li className="dropdown user user-menu">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setVisibleUser(!visibleUser);
                                        }}
                                    >
                                        <img
                                            src="/images/admin/avatar5.png"
                                            className="user-image"
                                            alt="User Image"
                                        />
                                        <span className="hidden-xs">
                                            {admin.user.name ?? ''}
                                        </span>
                                    </a>
                                    <ul
                                        className={`dropdown-menu ${
                                            visibleUser ? 'show' : ''
                                        }`}
                                    >
                                        <li className="user-header">
                                            <img
                                                src="/images/admin/avatar5.png"
                                                className="img-circle"
                                                alt="User Image"
                                            />
                                            <p>
                                                {admin.user.name ?? ''}
                                                <small>
                                                    {admin.user.email ?? ''}
                                                </small>
                                            </p>
                                        </li>
                                        <li className="user-footer">
                                            <div className="pull-left">
                                                <a
                                                    href="#"
                                                    className="btn btn-default btn-flat"
                                                >
                                                    Perfil
                                                </a>
                                            </div>
                                            <div className="pull-right">
                                                <a
                                                    href="#"
                                                    className="btn btn-default btn-flat"
                                                    onClick={handleSubmitLogOut}
                                                >
                                                    Sair
                                                </a>
                                            </div>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </header>
                <aside className="main-sidebar">
                    <section className="sidebar">
                        <div className="user-panel">
                            <div className="pull-left image">
                                <img
                                    src="/images/admin/avatar5.png"
                                    className="img-circle"
                                    alt="User Image"
                                />
                            </div>
                            <div className="pull-left info">
                                <p>{admin.user.name ?? ''}</p>
                                <a href="#">
                                    <i className="fa fa-circle text-success"></i>{' '}
                                    Online
                                </a>
                            </div>
                        </div>

                        <ul className="sidebar-menu" data-widget="tree">
                            <li className="header">MENU</li>
                            <li className={home ? 'active' : ''}>
                                <a href="/admin">
                                    <i className="fa fa-home"></i>
                                    <span>Tela Inicial</span>
                                </a>
                            </li>
                            <li className={menus ? 'active' : ''}>
                                <a href="/admin/menus">
                                    <i className="fa fa-cutlery"></i>
                                    <span>Menu</span>
                                </a>
                            </li>
                            <li className={reservations ? 'active' : ''}>
                                <a href="/admin/reservations">
                                    <i className="fa fa-calendar-check-o"></i>
                                    <span>Reservas</span>
                                </a>
                            </li>
                            <li className={contacts ? 'active' : ''}>
                                <a href="/admin/contacts">
                                    <i className="fa fa-comments"></i>
                                    <span>Contatos</span>
                                </a>
                            </li>
                            <li className={users ? 'active' : ''}>
                                <a href="/admin/users">
                                    <i className="fa fa-users"></i>
                                    <span>Usuários</span>
                                </a>
                            </li>
                            <li className={emails ? 'active' : ''}>
                                <a href="/admin/emails">
                                    <i className="fa fa-envelope"></i>
                                    <span>E-mails</span>
                                </a>
                            </li>
                        </ul>
                    </section>
                </aside>
                {children}
                <footer className="main-footer">
                    <div className="pull-right hidden-xs">
                        <a
                            target="_blank"
                            href="https://www.hcode.com.br"
                            rel="noreferrer"
                        >
                            Hcode
                        </a>
                    </div>
                    Projeto desenvolvido no curso online de JavaScript da Hcode
                    Treinamentos.
                </footer>
            </div>
        </div>
    );
};

export default AdminLayout;
