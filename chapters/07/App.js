import React from 'react';
import DANIEL_SRC from './assets/daniel.jpg';
import COOLER_DANIEL_SRC from './assets/cooler-daniel.jpg';
import Person from './Person';
import cooler from './cooler';

// Extend the bland, simple Person to be a cooler, more rad CoolerPerson.
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
