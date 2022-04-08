import { FormGroup, Input, TextField } from "@mui/material";
import React from "react";
import { Label } from "reactstrap";
import PropTypes from 'prop-types'
import { Field } from "formik";

InputField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,

    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disabled: false,
}

function InputField(props: any): JSX.Element {
    const { field, type, options, label, placeholder, disabled } = props;
    const { name, value, onBlur, onChange } = field;

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <TextField id={name} type={type} {...field} disabled={disabled} label={placeholder} variant="filled" />
            {/* <Input
                id={name}
                {...field}
                type={type}
                variant="filled"
                disabled={disabled}
                placeholder={placeholder}
            /> */}
        </FormGroup>
    );
}

export default InputField; 