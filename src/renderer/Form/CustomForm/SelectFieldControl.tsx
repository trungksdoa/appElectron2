import PropTypes from 'prop-types';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Select from 'react-select';
import { FormGroup } from 'reactstrap';

// eslint-disable-next-line @typescript-eslint/no-use-before-define
SelectField.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  field: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  form: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  placeholder: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  disabled: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  options: PropTypes.array,
};

// eslint-disable-next-line @typescript-eslint/no-use-before-define
SelectField.defaultProps = {
  label: '',
  placeholder: '',
  disabled: false,
  options: [],
};

function SelectField(props: any) {
  const {field, options, placeholder, disabled} = props;
  const {name, value} = field;
  const selectedOption = options.find(
    (option: { value: any }) => option.value === value
  );

  console.log(selectedOption);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const handleSelectedOptionChange = (selectedOption: { value: any }) => {
    const selectedValue = selectedOption
      ? selectedOption.value
      : selectedOption;

    const changeEvent = {
      target: {
        name,
        value: selectedValue,
      },
    };
    field.onChange(changeEvent);
  };

  return (
    <FormGroup>
      <Select
        id={name}
        /* eslint-disable-next-line react/jsx-props-no-spreading */
        {...field}
        value={selectedOption}
        onChange={handleSelectedOptionChange}
        placeholder={placeholder}
        isDisabled={disabled}
        options={options}
      />
    </FormGroup>
  );
}

export default SelectField;
