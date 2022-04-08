import { FormGroup, Input, TextField } from '@mui/material';
// import React from 'react';
import { Label } from 'reactstrap';
import { CurrencyFormat } from 'words/words';
import PropTypes from 'prop-types';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
PriceField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  field: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  form: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types,react/no-unused-prop-types
  customInput: PropTypes.any,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
PriceField.defaultProps = {
  type: 'text',
  customInput: Input,
  label: '',
  placeholder: '',
  disabled: false,
};

function PriceField(props: any): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { field, type, options, label, placeholder, disabled } = props;
  const { name, value } = field;

  const handleSelectedOptionChange = (priceValue: any) => {
    const changeEvent = {
      target: {
        name,
        value: priceValue,
      },
    };
    field.onChange(changeEvent);
  };
  return (
    <FormGroup>
      {label && <Label for={name}>{label}</Label>}
      <small>{placeholder}</small>
      <CurrencyFormat
        id={name}
        value={value === 0 ? 0 : value}
        thousandSeparator
        suffix=" VNĐ"
        customInput={TextField}
        label={placeholder}
        variant="filled"
        onValueChange={(khachtra: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
          // @ts-ignore
          // eslint-disable-next-line @typescript-eslint/no-shadow
          const { formattedValue, value } = khachtra;
          handleSelectedOptionChange(value);
        }}
      />
    </FormGroup>
  );
}

export default PriceField;
