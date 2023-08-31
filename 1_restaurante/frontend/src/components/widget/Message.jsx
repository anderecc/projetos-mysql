const Message = ({ error, success }) => {
    return (
        <>
            {error ? (
                <div className="alert alert-danger text-red">{error}</div>
            ) : (
                false
            )}
            {success ? (
                <div className="alert alert-success text-green">{success}</div>
            ) : (
                false
            )}
        </>
    );
};

export default Message;
