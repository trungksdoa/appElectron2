import { Checkbox, FormGroup } from '@mui/material';
import React from 'react';
import { Label } from 'reactstrap';
import PropTypes from 'prop-types';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
CheckBoxField.propTypes = {
  label: PropTypes.string,
};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
CheckBoxField.defaultProps = {
  label: '',
};

function CheckBoxField(props: any): JSX.Element {
  const { field, label } = props;
  const { name, value, onChange } = field;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const home_display = { inputProps: { 'aria-label': 'Hiển thị' } };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const changeEvent = {
      target: {
        name,
        value: event.target.checked,
      },
    };
    onChange(changeEvent);
  };
  const formGroup = (
    <>
      <FormGroup>
        {label && <Label for={name}>{label}</Label>}

        <Checkbox
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...home_display}
          checked={value}
          onChange={handleChange}
          sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
        />
      </FormGroup>
    </>
  );
  return formGroup;
}

export default CheckBoxField;
