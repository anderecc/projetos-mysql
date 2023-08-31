import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { login, verifyLogin } from '../../functions/admin';
import Message from '../../components/widget/Message';
import redirect from '../../utils/redirect';
import { adminSetUser } from '../../store/actions/adminActions';
import format from '../../utils/format';

const AdminLogin = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        verifyLogin()
            .then(() => {
                return redirect('/admin');
            })
            .catch(() => {
                return;
            });
    }, []);

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        login(format.getInputsValues(e.target))
            .then((res) => {
                format.resetInputsValues(e.target);
                setError('');
                setSuccess('Autenticado com sucesso');
                dispatch(adminSetUser(res));
                redirect('/admin');
            })
            .catch((err) => {
                setSuccess('');
                setError(err);
            });
    };

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="#">
                        <b>Admin</b>Hcode
                    </a>
                </div>
                <div className="login-box-body">
                    <p className="login-box-msg">Acesso a Área Restrita</p>
                    <Message error={error} success={success} />
                    <form onSubmit={handleSubmitLogin}>
                        <div className="form-group has-feedback">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="E-mail"
                                name="email"
                            />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Senha"
                                name="password"
                            />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <div className="row">
                            <div className="col-xs-4">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block btn-flat"
                                >
                                    Entrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
