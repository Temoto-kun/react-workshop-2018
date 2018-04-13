// In here, we can customize higher-order components using parameters.
// We could also return either stateless or stateful components.

import React from 'react';

function withValidation(params) {
	return function component(Component) {
		return class ComponentWithValidation extends React.Component {
			constructor() {
				super();
				const valid = Object.keys(params).reduce((validations, key) => ({
					...validations,
					[key]: false,
				}), {});
				this.state = { valid };
				this.validate = this.validate.bind(this);
				this.handleFieldChange = this.handleFieldChange.bind(this);
				this.handleSubmit = this.handleSubmit.bind(this);
			}

			componentWillReceiveProps(props) {
				this.validate(props);
			}

			// The reason we use the props parameter instead of this.props is we can use the new props
			// right away when being invoked va componentWillReceiveProps() (see above)
			validate(props) {
				const valid = Object.keys(params).reduce((validations, key) => ({
					...validations,
					[key]: params[key](props[key]),
				}), {});
				this.setState({ valid });
			}

			// In here, we customize the implementation of changing fields by adding this.validate();
			handleFieldChange(field) {
				const { onFieldChange } = this.props;

				this.validate(this.props);

				if (onFieldChange) {
					onFieldChange(field);
				}
			}

			// This is a simple pass-through method since we won't modify the logic for submitting.
			handleSubmit(e) {
				const { onSubmit } = this.props;
				if (onSubmit) {
					onSubmit(e);
					return;
				}
				e.preventDefault();
			}

			render() {
				const valid = Object.keys(this.state.valid).reduce((valid, key) => (valid && this.state.valid[key]), true);
				return (
					<Component
						{ ...this.props }
						onFieldChange={ this.handleFieldChange }
						onSubmit={ this.handleSubmit }
						valid={ valid }
					/>
				);
			}
		}
	};
}

export default withValidation;
