import { useState } from 'react';
import { handleSubmitNewsLetter } from '../../functions/app';
import Message from '../widget/Message';

const NewsLetter = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    return (
        <div id="gtco-subscribe">
            <div className="gtco-container">
                <div className="row animate-box">
                    <div className="col-md-8 col-md-offset-2 text-center gtco-heading">
                        <h2 className="cursive-font">Se inscrever</h2>
                        <p>Receba as novidades do nosso restaurante</p>
                        <Message error={error} success={success} />
                    </div>
                </div>
                <div className="row animate-box">
                    <div className="col-md-8 col-md-offset-2">
                        <form
                            className="form-inline"
                            onSubmit={(e) =>
                                handleSubmitNewsLetter(e)
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
                            <div className="col-md-6 col-sm-6">
                                <div className="form-group">
                                    <label htmlFor="email" className="sr-only">
                                        E-mail
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        placeholder="Seu E-mail"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6">
                                <button
                                    type="submit"
                                    className="btn btn-default btn-block"
                                >
                                    Inscrever
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;
