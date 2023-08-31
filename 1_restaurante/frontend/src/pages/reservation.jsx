import { useState } from 'react';
import Layout from '../components/layouts/Layout';
import { handleSubmitReservation } from '../functions/app';
import Message from '../components/widget/Message';

const PageReservation = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <Layout title="Reserve sua mesa." reservation label="Reserve uma Mesa!">
            <div className="gtco-section" style={{ paddingBottom: '14em' }}>
                <div className="gtco-container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6 animate-box">
                                <h3>Reserva de mesa</h3>
                                <Message error={error} success={success} />
                                <form
                                    onSubmit={(e) =>
                                        handleSubmitReservation(e)
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
                                                    -- selecione --{' '}
                                                </option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5+</option>
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
                            <div className="col-md-5 col-md-push-1 animate-box">
                                <div className="gtco-contact-info">
                                    <h3>Informações de Contato</h3>
                                    <ul>
                                        <li className="address">
                                            Rua Ademar Saraiva Leão, 234
                                            <br /> Alvarenga, São Bernardo do
                                            Campo - SP
                                        </li>
                                        <li className="phone">
                                            <a href="tel://1234567890">
                                                +1 234 567 890
                                            </a>
                                        </li>
                                        <li className="email">
                                            <a href="mailto:contato@hcode.com.br">
                                                contato@hcode.com.br
                                            </a>
                                        </li>
                                        <li className="url">
                                            <a href="https://www.hcode.com.br">
                                                Hcode.com.br
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

export default PageReservation;
