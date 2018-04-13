// This is a RegistrationForm component, which features various kinds of input.

// It handles addition, update, and deletion of registrants.

// Even though we have different types of input, these have simpler native implementations
// of validations. We will demonstrate how we can implement stricter validation through
// custom means in the following chapters.

import React from 'react';
import TextBox from './TextBox';
import ImageSelector from './ImageSelector';

function RegistrationForm({ images, name, mode, email, phone, image, onFieldChange, onDelete, onSubmit }) {
	const isEdit = mode === 'edit';
	return (
		<form onSubmit={ onSubmit }>
			<div className="card">
				<div className="card-header">
					<h2 className="card-title">{ isEdit ? 'Edit Existing Registrant' : 'Add New Registrant' }</h2>
				</div>
				<div className="card-body">
					<div className="form-group">
						<TextBox id="name" name="name" value={ name } onChange={ onFieldChange } label="Name" />
					</div>
					<div className="form-group">
						<TextBox id="email" name="email" value={ email } onChange={ onFieldChange } label="Email" type="email" />
					</div>
					<div className="form-group">
						<TextBox id="phone" name="phone" value={ phone } onChange={ onFieldChange } label="Phone number" type="tel" />
					</div>
					<ImageSelector id="image" name="image" label="Image" onChange={ onFieldChange } images={ images } value={ image }/>
				</div>
				<div className="card-footer text-right">
					{ isEdit && <button className="btn btn-danger" type="reset" onClick={ onDelete }>Delete</button> }
					{ ' ' }
					<button className="btn btn-primary" type="submit">{ isEdit ? 'Update' : 'Add' }</button>
				</div>
			</div>
		</form>
	);
}

export default RegistrationForm;
