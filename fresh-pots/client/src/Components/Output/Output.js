import React from 'react'


export default function Output(props) {

    let validOutput = props.isValidOutput
    let outputClass = "output "
    
    if (validOutput) {
        outputClass += "output-success"
    } else {
        outputClass += 'output-error'
    }

    let theme = props.theme

    if (theme === 'tomorrow') {
        outputClass += "output-light"
    }

    return (

        <textarea className={outputClass} {...props}></textarea>

    )
}

