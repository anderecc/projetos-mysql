const format = {
    getInputsValues: function (form) {
        const values = {};
        const inputs = form.querySelectorAll('[name]');

        inputs.forEach((input) => {
            if (input.name === 'date') {
                const value = input.value.split('-').join('/');
                return (values[input.name] = value);
            }

            if (input.name === 'photo') {
                return (values[input.name] = input.files[0] ?? '');
            }
            return (values[input.name] = input.value);
        });
        return values;
    },
    resetInputsValues: function (form) {
        const inputs = form.querySelectorAll('[name]');

        inputs.forEach((input) => (input.value = ''));
    },
    toCurrency: function (number) {
        return `R$: ${number.toFixed(2)}`;
    },
    imageToBase64: function (e, idPreview) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener(
            'load',
            () => {
                // convert image file to base64 string
                document.getElementById(idPreview).src = reader.result;
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    },
    date: function (date) {
        let newDate = date.split('').splice(0, 10).join('');
        return newDate;
    },
};

export default format;
