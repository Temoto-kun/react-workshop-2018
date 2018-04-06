import React from 'react';
import BIRD_SRC from '../02/assets/bird.jpeg';
import LIZARD_SRC from '../02/assets/lizard.png';
import PEACH_SRC from '../02/assets/peach.png';
import RABBIT_SRC from '../02/assets/rabbit.png';

const IMAGES = [
	{
		src: BIRD_SRC,
		caption: 'Bird',
	},
	{
		src: LIZARD_SRC,
		caption: 'Lizard',
	},
	{
		src: PEACH_SRC,
		caption: 'Peach',
	},
	{
		src: RABBIT_SRC,
		caption: 'Rabbit',
	}
];

function filterRegistrants(registrants, query) {
	query = query.toLowerCase();

	if (query.trim().length < 1) {
		return registrants;
	}

	return registrants.filter(registrant => (
		registrant.name.toLowerCase().includes(query) ||
			registrant.email.toLowerCase().includes(query) ||
			registrant.phone.toLowerCase().includes(query)
	));
}

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

function RegistrantList({ onSearch, query, registrants, selectedRegistrant, onFieldChange, onSelect }) {
	return (
		<React.Fragment>
			<form className="mb-3" onSubmit={ onSearch }>
				<div className="card">
					<div className="card-header">
						<h2 className="card-title">Search</h2>
					</div>
					<div className="card-body">
						<TextBox id="query" name="query" value={ query } label="Query" onChange={ onFieldChange }/>
					</div>
				</div>
			</form>
			{
				registrants.length > 0 ?
					<div className="card-columns">
						{
							registrants.map(registrant => (
								<div
									className={ selectedRegistrant && registrant.id === selectedRegistrant.id ? 'card border-primary' : 'card' }
									key={registrant.id}
									onClick={ () => { onSelect(registrant) } }
								>
									<img src={ registrant.image } alt={ registrant.name } className="card-img-top"/>
									<div className="card-body">
										<div className="card-title">
											{ registrant.name }
										</div>
										<div className="card-text">
											<small>
												<dl>
													<dt>Email</dt>
													<dd>{ registrant.email }</dd>
													<dt>Phone Number</dt>
													<dd>{ registrant.phone }</dd>
												</dl>
											</small>
										</div>
									</div>
								</div>
							))
						}
					</div> :
					<div className="text-center p-5">
						<p>No registrants found.</p>
					</div>
			}
		</React.Fragment>
	)
}

function ImageSelector({ images, name, label, id, value, onChange }) {
	return (
		<React.Fragment>
			<label htmlFor={ id }>{ label }</label>
			{
				images.map(image => (
					<label id={ id } key={ image.src }>
						<figure className={ value === image.src ? 'card position-relative border-primary' : 'card position-relative' }>
							<img className="card-img" src={image.src} alt={image.caption}/>
							<input type="radio" name={name} checked={ value === image.src } className="position-absolute"
										 onClick={ () => onChange({ name, value: image.src }) }
										 style={{ top: 15, right: 15 }}/>
						</figure>
					</label>
				))
			}
		</React.Fragment>
	);
}

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
					<RegistrationForm
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
				<h1>Henlo</h1>
			</div>
		</div>
		<div className="my-5">
			<div className="container">
				<Registration images={ IMAGES }/>
			</div>
		</div>
	</React.Fragment>
);

export default App;
