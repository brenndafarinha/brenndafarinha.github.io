import React from 'react';


const FormInput = (props) => {
    let textInput = React.createRef();
    let errorMessage = props.error;
    let formError = 'form_erro'
    if (props.touched && !props.valid) {
        formError = 'show_erro'
    }   if (props.touched && !props.valid && props.value == "") {
        errorMessage = 'Campo obrigatório'
    }
    return (
        <div>

            <input ref={textInput} type="text" className="form-input" {...props} />
            <p className={formError}>{errorMessage}</p>

        </div>
    );
}

export default FormInput; 