// Core
import React from 'react';
import { bool } from 'prop-types';
import { createPortal } from 'react-dom';

// Instruments
import Styles from './styles';

const portal = document.getElementById('spinner');

const Spinner = ({ spin }) =>
    spin ? createPortal(<section className = { Styles.spinner } />, portal) : null;

Spinner.propTypes = {
    spin: bool.isRequired,
};

Spinner.defaultProps = {
    spin: false,
};

export default Spinner;
