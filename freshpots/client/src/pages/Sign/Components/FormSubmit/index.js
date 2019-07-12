import React from 'react';


const FormSubmit = (props) => {

    return (
        <button className='form-btn' {...props}>{props.children}</button>
    );
}

export default FormSubmit; 
