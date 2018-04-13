// Higher-order components are the results of components being passed as a parameter
// to functions returning another functions.

import React from 'react';

function cooler(Component) {
	return function CoolerComponent(props) {
		return (
			<Component {...props} name={ `The cooler ${props.name}` } style={{ border: '12px double green' }}/>
		);
	}
}

export default cooler;
