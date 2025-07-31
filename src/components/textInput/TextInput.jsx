import React from 'react';

export default function TextInput(props) {
    const {onChange, label, ...rest} = props;
    const handleInputChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <>
            <label htmlFor={label}>{label}</label>
            <input
                type="text"
                id={label}
                style={{padding: '8px', fontSize: '16px'}}
                onChange={handleInputChange}
                {...rest}
            />
        </>
    );
}
