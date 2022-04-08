import { Checkbox, FormGroup, Input, TextField } from "@mui/material";
import React from "react";
import { Label } from "reactstrap";
import PropTypes from 'prop-types'
import { Field } from "formik";

CheckBoxField.propTypes = {
    label: PropTypes.string,
};

CheckBoxField.defaultProps = {
    label: '',
}

function CheckBoxField(props: any): JSX.Element {
    const { field, label } = props;
    const { name, value, onBlur, onChange } = field;
    const home_display = { inputProps: { 'aria-label': 'Hiển thị' } };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const changeEvent = {
            target: {
                name: name,
                value: event.target.checked
            }
        };
        onChange(changeEvent);
      };
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}

            <Checkbox
                {...home_display}
                checked={value}
                onChange={handleChange}
                sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
            />
        </FormGroup>
    );
}

export default CheckBoxField; 