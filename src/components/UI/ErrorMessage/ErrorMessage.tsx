import React from 'react';
import './errorMessage.css'

export interface ErrorMessageProps {
    error: string,
}

const ErrorMessage = ({ error }:ErrorMessageProps) => {
    return (
        <p className={'error-message'}> { error }</p>
    );
};

export default ErrorMessage;