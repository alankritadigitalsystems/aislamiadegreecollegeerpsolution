import React from "react";
import Select from "react-select";

const CustomSelect = ({placeholder, field, form, options}) => {
    const onChange = (data) => {
        form.setFieldValue(
            field.name,
            data.map((option) => option.value)
        );
    };

    const getValue = () => {
        return options.filter(option => field.value.indexOf(option.value) >= 0)
    };

    return (
        <Select
            name={field.name}
            value={getValue()}
            onChange={onChange}
            placeholder={placeholder}
            options={options}
            isMulti
        />
    );
}

export default CustomSelect;