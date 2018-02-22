// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles';

class ErrorMessage extends Component {

    static propTypes = {
        message: string.isRequired,
    }

    componentDidMount () {
        setTimeout(() => console.log('timeout'), 3000);
    }

    render () {
        const { message } = this.props;

        return (
            <div className = { Styles.error }>
                <span className = { Styles.message }>{ message }</span>
            </div>
        );
    }
}

export default ErrorMessage;
