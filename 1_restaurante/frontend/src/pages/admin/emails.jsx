import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { deleteEmailNewsLetter, emailsNewsLetter } from '../../functions/admin';

const AdminEmails = () => {
    const [emails, setEmails] = useState([]);
    useEffect(() => {
        emailsNewsLetter()
            .then((res) => {
                setEmails(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDeleteEmailNewsLetter = (e) => {
        deleteEmailNewsLetter(e.target.dataset.id)
            .then((res) => {
                setEmails(res.emails);
            })
            .catch((err) => console.log(err));
    };

    const renderEmails = () => {
        const data = emails ?? [];
        return data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.email}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-xs btn-danger btn-delete"
                        onClick={handleDeleteEmailNewsLetter}
                    >
                        <i className="fa fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <AdminLayout emails>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>E-mails</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/admin">
                                <i className="fa fa-home"></i> Home
                            </a>
                        </li>
                        <li className="active">E-mails</li>
                    </ol>
                </section>

                <section className="content container-fluid">
                    <div className="box">
                        <div className="box-header">
                            <h3 className="box-title">Lista</h3>
                        </div>
                        <div className="box-body no-padding">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th style={{ width: '10px' }}>#</th>
                                        <th>E-mail</th>
                                        <th style={{ minWidth: '75px' }}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderEmails()}</tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminEmails;
