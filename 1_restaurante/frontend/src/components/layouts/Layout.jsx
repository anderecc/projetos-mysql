import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { handleSubmitReservation } from '../../functions/app';
import Message from '../widget/Message';

const Layout = ({ title, children, contact, home, reservation, label }) => {
    document.title = title;
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const app = useSelector((state) => state.app);

    useEffect(() => {
        if (app.loaded) {
            setDisable(true);
        }
    }, [app.loaded]);

    return (
        <div id="page">
            <div
                className="gtco-loader"
                style={{ display: disable ? 'none' : 'block' }}
            ></div>

            <nav className="gtco-nav" role="navigation">
                <div className="gtco-container">
                    <div className="row">
                        <div className="col-sm-4 col-xs-12">
                            <div id="gtco-logo">
                                <a href="/">
                                    Saboroso
                                    <em>!</em>
                                </a>
                            </div>
                        </div>
                        <div className="col-xs-8 text-right menu-1">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/menu">Menu</a>
                                </li>
                                <li>
                                    <a href="/services">Serviços</a>
                                </li>
                                <li>
                                    <a href="/contact">Contato</a>
                                </li>
                                <li className="btn-cta">
                                    <a href="reservation">
                                        <span>Reserva</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>

            <header
                id="gtco-header"
                className={`gtco-cover ${
                    home ? 'gtco-cover-md' : 'gtco-cover-sm'
                }`}
                role="banner"
                style={{
                    backgroundImage: contact
                        ? 'url(images/img_bg_3.jpg)'
                        : reservation
                        ? 'url(images/img_bg_2.jpg)'
                        : 'url(images/img_bg_1.jpg)',
                }}
                data-stellar-background-ratio="0.5"
            >
                <div className="overlay"></div>
                <div className="gtco-container">
                    <div className="row">
                        <div
                            className={`col-md-12 col-md-offset-0 ${
                                home ? 'text-left' : 'text-center'
                            }`}
                        >
                            <div
                                className={`row ${
                                    home ? 'margin-top-home' : 'row-mt-15em'
                                } `}
                            >
                                <div
                                    className={`${
                                        home ? 'col-md-7' : 'col-md-12'
                                    } mt-text animate-box`}
                                    data-animate-effect="fadeInUp"
                                >
                                    <span className="intro-text-small">
                                        Feito por
                                        <a
                                            href="https://www.hcode.com.br"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Hcode.com.br
                                        </a>
                                    </span>
                                    <h1 className="cursive-font">{label}</h1>
                                </div>
                                {home ? (
                                    <div
                                        className="col-md-4 col-md-push-1 animate-box"
                                        data-animate-effect="fadeInRight"
                                    >
                                        <div className="form-wrap">
                                            <div className="tab">
                                                <div className="tab-content">
                                                    <Message
                                                        error={error}
                                                        success={success}
                                                    />
                                                    <div
                                                        className="tab-content-inner active"
                                                        data-content="signup"
                                                    >
                                                        <h3 className="cursive-font">
                                                            Reserva de mesa
                                                        </h3>
                                                        <form
                                                            onSubmit={(e) =>
                                                                handleSubmitReservation(
                                                                    e
                                                                )
                                                                    .then(
                                                                        (
                                                                            res
                                                                        ) => {
                                                                            setError(
                                                                                ''
                                                                            );
                                                                            setSuccess(
                                                                                res
                                                                            );
                                                                            setTimeout(
                                                                                () => {
                                                                                    setSuccess(
                                                                                        ''
                                                                                    );
                                                                                },
                                                                                3000
                                                                            );
                                                                        }
                                                                    )
                                                                    .catch(
                                                                        (
                                                                            err
                                                                        ) => {
                                                                            setSuccess(
                                                                                ''
                                                                            );
                                                                            setError(
                                                                                err
                                                                            );
                                                                        }
                                                                    )
                                                            }
                                                            className="form-home"
                                                        >
                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="inputName">
                                                                        Nome
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="inputName"
                                                                        name="name"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="inputEmail">
                                                                        E-mail
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        id="inputEmail"
                                                                        name="email"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="inputPeople">
                                                                        Pessoas
                                                                    </label>
                                                                    <select
                                                                        id="inputPeople"
                                                                        name="people"
                                                                        className="form-control"
                                                                    >
                                                                        <option value="">
                                                                            {' '}
                                                                            --
                                                                            selecione
                                                                            --{' '}
                                                                        </option>
                                                                        <option value="1">
                                                                            1
                                                                        </option>
                                                                        <option value="2">
                                                                            2
                                                                        </option>
                                                                        <option value="3">
                                                                            3
                                                                        </option>
                                                                        <option value="4">
                                                                            4
                                                                        </option>
                                                                        <option value="5">
                                                                            5+
                                                                        </option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="inputDate">
                                                                        Data
                                                                    </label>
                                                                    <input
                                                                        type="date"
                                                                        id="inputDate"
                                                                        name="date"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="inputTime">
                                                                        Hora
                                                                    </label>
                                                                    <input
                                                                        type="time"
                                                                        id="inputTime"
                                                                        name="time"
                                                                        className="form-control"
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className="row form-group">
                                                                <div className="col-md-12">
                                                                    <input
                                                                        type="submit"
                                                                        className="btn btn-primary btn-block"
                                                                        value="Reservar Agora"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    false
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {children}

            <footer
                id="gtco-footer"
                role="contentinfo"
                style={{ backgroundImage: 'url(images/img_bg_1.jpg)' }}
                data-stellar-background-ratio="0.5"
            >
                <div className="overlay"></div>
                <div className="gtco-container">
                    <div className="row row-pb-md">
                        <div className="col-md-12 text-center">
                            <div className="gtco-widget">
                                <h3>Entrar em Contato</h3>
                                <ul className="gtco-quick-contact">
                                    <li>
                                        <a href="#">
                                            <i className="icon-phone"></i> +1
                                            234 567 890
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="icon-mail2"></i>{' '}
                                            contato@hcode.com.br
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="icon-chat"></i> Chat
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="gtco-widget">
                                <h3>Redes Sociais</h3>
                                <ul className="gtco-social-icons">
                                    <li>
                                        <a href="https://twitter.com/hcodebr">
                                            <i className="icon-twitter"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.facebook.com/hcodebr">
                                            <i className="icon-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/company/grupo-hcode/">
                                            <i className="icon-linkedin"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.youtube.com/channel/UCjWENuSH2gX55-y7QSZiWxA">
                                            <i className="icon-youtube"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-md-12 text-center copyright">
                            <p>
                                <small className="block">
                                    &copy; 2018 Hcode. Todos os Direitos
                                    Reservados.
                                </small>
                                <small className="block">
                                    Desenvolvido por
                                    <a
                                        href="https://www.hcode.com.br"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Hcode.com.br
                                    </a>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="gototop js-top ">
                <a href="#" className="js-gotop">
                    <i className="icon-arrow-up"></i>
                </a>
            </div>
        </div>
    );
};

export default Layout;
