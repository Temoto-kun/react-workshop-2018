// The code is almost the same with Chapter 6.
// The addition is we use our brand new ValidatedRegistrationForm
// which is extended with the withValidation() function

import React from 'react';
import { IMAGES } from '../03/App';
import RegistrantList from '../06/RegistrantList';
import filterRegistrants from '../06/filterRegistrants';
import RegistrationForm from './RegistrationForm';
import withValidation from './withValidation';
import { validateEmail, validatePhone } from './validation';

const ValidatedRegistrationForm = withValidation({
	name: (input) => input.trim().length > 0,
	email: (input) => validateEmail(input.trim().toLowerCase()),
	phone: (input) => validatePhone(input.trim()),
	image: (input) => input.trim().length > 0
})(RegistrationForm);

class Registration extends React.Component {
	constructor() {
		super();
		this.state = {
			registrants: [],
			mode: 'add',
			add: {
				id: 1,
				name: '',
				email: '',
				phone: '',
				image: '',
			},
			edit: null,
			query: ''
		};
		this.commitRegistrant = this.commitRegistrant.bind(this);
		this.deleteRegistrant = this.deleteRegistrant.bind(this);
		this.handleFieldChange = this.handleFieldChange.bind(this);
		this.handleRegistrantSelect = this.handleRegistrantSelect.bind(this);
	}

	commitRegistrant(e) {
		e.preventDefault();
		this.setState(({ registrants, mode, ...state }) => {
			let modifiedRegistrants;
			let newRegistrant = state[mode];

			switch (mode) {
				case 'add':
					modifiedRegistrants = [ ...registrants, newRegistrant ];
					break;
				case 'edit':
					modifiedRegistrants = registrants
						.map(registrant => (registrant.id === newRegistrant.id ? newRegistrant : registrant));
					break;
				default:
					throw new Error(`Unknown mode ${ mode }`);
			}
			return {
				registrants: modifiedRegistrants,
				[mode]: (
					mode === 'add' ?
					{
						id: state[mode].id + 1,
						name: '',
						email: '',
						phone: '',
						image: '',
					} : null
				),
				mode: 'add'
			};
		});
	}

	deleteRegistrant(e) {
		e.preventDefault();
		this.setState(({ registrants, edit }) => {
			let modifiedRegistrants;

			modifiedRegistrants = registrants.filter(registrant => registrant.id !== edit.id);
			return {
				registrants: modifiedRegistrants,
				mode: 'add',
				edit: null,
			};
		})
	}

	handleFieldChange(field) {
		if (field.name === 'query') {
			this.setState({ query: field.value });
			return;
		}
		this.setState(({ mode, ...state }) => ({
			[mode]: {
				...state[mode],
				[field.name]: field.value,
			},
		}));
	}

	handleRegistrantSelect(registrant) {
		this.setState(({ edit }) => {
			const isSameRegistrant = edit && edit.id === registrant.id;
			return {
				edit: isSameRegistrant ? null : registrant,
				mode: isSameRegistrant ? 'add' : 'edit',
			};
		})
	}

	render() {
		const { images } = this.props;
		const { registrants, add, mode, edit, query } = this.state;
		const filteredRegistrants = filterRegistrants(registrants, query);
		const isEdit = mode === 'edit';

		return (
			<div className="row">
				<div className="col-md-7 mb-3 order-1 order-md-0">
					<RegistrantList
						selectedRegistrant={ edit }
						onFieldChange={ this.handleFieldChange }
						onSelect={ this.handleRegistrantSelect }
						registrants={ filteredRegistrants }
					/>
				</div>
				<div className="col-md-5 mb-3 order-0 order-md-1">
					<ValidatedRegistrationForm
						images={ images }
						mode={ mode }
						name={ isEdit ? edit.name : add.name }
						email={ isEdit ? edit.email : add.email }
						phone={ isEdit ? edit.phone : add.phone }
						image={ isEdit ? edit.image : add.image }
						onFieldChange={ this.handleFieldChange }
						onDelete={ this.deleteRegistrant }
						onSubmit={ this.commitRegistrant }
					/>
				</div>
			</div>
		);
	}
}

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<Registration images={ IMAGES }/>
			</div>
		</div>
	</React.Fragment>
);

export default App;
