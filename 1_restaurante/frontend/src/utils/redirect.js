const redirect = (path) => {
    const a = document.createElement('a');
    a.href = path;
    a.click();
};

export default redirect;
