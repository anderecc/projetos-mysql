import { useEffect, useState } from 'react';
import AdminLayout from '../../components/layouts/AdminLayout';
import { contactsMessages, deleteContactMessage } from '../../functions/admin';

const AdminContacts = () => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        contactsMessages()
            .then((res) => {
                setMessages(res);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleDeleteContactMessage = (e) => {
        deleteContactMessage(e.target.dataset.id)
            .then((res) => {
                setMessages(res.messages);
            })
            .catch((err) => console.log(err));
    };

    const renderMessages = () => {
        const data = messages ?? [];
        return data.map((item, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>
                    <button
                        type="button"
                        className="btn btn-xs btn-danger btn-delete"
                        data-id={item.id}
                        onClick={handleDeleteContactMessage}
                    >
                        <i className="fa fa-trash"></i> Excluir
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <AdminLayout contacts>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Contatos</h1>
                    <ol className="breadcrumb">
                        <li>
                            <a href="/admin">
                                <i className="fa fa-home"></i> Home
                            </a>
                        </li>
                        <li className="active">Contatos</li>
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
                                        <th>Nome</th>
                                        <th>E-mail</th>
                                        <th>Mensagem</th>
                                        <th style={{ minWidth: '75px' }}>
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderMessages()}</tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
};

export default AdminContacts;
