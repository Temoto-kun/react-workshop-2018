// A simple TextBox component.

// It is desired that we have text boxes with both labels and placeholders for accessibility.

import React from 'react';

function TextBox({ id, name, label, type = 'text', value, onChange }) {
	return (
		<React.Fragment>
			<label htmlFor={id}>{label}</label>
			<input
				id={id}
				name={name}
				value={value}
				className="form-control"
				onChange={ (e) => {
					onChange({ name, value: e.target.value });
				} }
				placeholder={label}
				type={type}
			/>
		</React.Fragment>
	)
}

export default TextBox;
