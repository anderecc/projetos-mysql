import { useState } from 'react';
import Layout from '../components/layouts/Layout';
import { handleSubmitContact } from '../functions/app';
import Message from '../components/widget/Message';

const PageContact = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <Layout title="Entre em contato conosco." contact label="Diga um oi!">
            <div className="gtco-section">
                <div className="gtco-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6 animate-box">
                                <Message error={error} success={success} />
                                <h3>Entre em Contato</h3>
                                <form
                                    onSubmit={(e) =>
                                        handleSubmitContact(e)
                                            .then((res) => {
                                                setError('');
                                                setSuccess(res);
                                                setTimeout(() => {
                                                    setSuccess('');
                                                }, 3000);
                                            })
                                            .catch((err) => {
                                                setSuccess('');
                                                setError(err);
                                            })
                                    }
                                >
                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <label
                                                className="sr-only"
                                                htmlFor="name"
                                            >
                                                Nome
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                placeholder="Seu nome"
                                            />
                                        </div>
                                    </div>

                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <label
                                                className="sr-only"
                                                htmlFor="email"
                                            >
                                                E-mail
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="form-control"
                                                placeholder="Seu endereço de e-mail"
                                            />
                                        </div>
                                    </div>
                                    <div className="row form-group">
                                        <div className="col-md-12">
                                            <label
                                                className="sr-only"
                                                htmlFor="message"
                                            >
                                                Mensagem
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                cols="30"
                                                rows="10"
                                                style={{ resize: 'none' }}
                                                className="form-control"
                                                placeholder="Escreve alguma coisa"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            value="Enviar"
                                            className="btn btn-primary"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-5 col-md-push-1 animate-box">
                                <div className="gtco-contact-info">
                                    <h3>Informações de Contato</h3>
                                    <ul>
                                        <li className="address">
                                            Avenida, R. José Versolato, 101 -
                                            12ª andar - Centro, São Bernardo do
                                            Campo - SP, 09750-730
                                        </li>
                                        <li className="phone">
                                            <a href="tel://1121497360">
                                                (11) 2149-7360
                                            </a>
                                        </li>
                                        <li className="email">
                                            <a href="mailto:contato@hcode.com.br">
                                                contato@hcode.com.br
                                            </a>
                                        </li>
                                        <li className="url">
                                            <a href="https://www.hcode.com.br">
                                                hcode.com.br
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PageContact;
