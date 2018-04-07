import React from 'react';
import DANIEL_SRC from './assets/daniel.jpg';
import COOLER_DANIEL_SRC from './assets/cooler-daniel.jpg';

function cooler(Component) {
	return function CoolerComponent(props) {
		return (
			<Component {...props} name={ `The cooler ${props.name}` } style={{ border: '12px double green' }}/>
		);
	}
}

function Person({ name, image, ...props }) {
	return (
		<figure className="card" { ...props }>
			<img className="card-img-top" src={ image } alt={ name } />
			<figcaption className="card-body">
				<p className="card-text">{ name }</p>
			</figcaption>
		</figure>
	);
}

const CoolerPerson = cooler(Person);

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<div className="card-deck w-75 mx-auto">
					<Person name="Daniel" image={ DANIEL_SRC } />
					<CoolerPerson name="Daniel" image={ COOLER_DANIEL_SRC } />
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default App;
