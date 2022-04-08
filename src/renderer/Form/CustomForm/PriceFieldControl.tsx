import {FormGroup, Input, TextField} from "@mui/material";
import React from "react";
import {Label} from "reactstrap";
import {CurrencyFormat} from "words/words";
import PropTypes from 'prop-types'

PriceField.propTypes = {
    field: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    customInput: PropTypes.any,
    type: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
};

PriceField.defaultProps = {
    type: 'text',
    customInput: Input,
    label: '',
    placeholder: '',
    disabled: false,
}

function PriceField(props: any): JSX.Element {
    const {field, type, options, label, placeholder, disabled} = props;
    const {name, value} = field;

    const handleSelectedOptionChange = (priceValue: any) => {
        const changeEvent = {
            target: {
                name: name,
                value: priceValue
            }
        };
        field.onChange(changeEvent);
    }
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <small>{placeholder}</small>
            <CurrencyFormat
                id={name}
                value={value === 0 ? 0 : value}
                thousandSeparator={true}
                suffix={' VNĐ'}
                customInput={TextField}
                label={placeholder}
                variant={"filled"}
                onValueChange={(khachtra: any) => {
                    const {formattedValue, value} = khachtra;
                    handleSelectedOptionChange(value)
                }}/>
        </FormGroup>
    );
}

export default PriceField; 