import React from 'react';
import { IMAGES } from '../03/App';

// We define utility functions here.
function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

// Check if all values are the same.
function checkForWin(values) {
	if (values.length < 1) {
		return false;
	}

	if (values.length < 2) {
		return true;
	}

	let firstValue = values[0];

	return values.slice(1).reduce((isWinning, value) => (
		isWinning && value === firstValue
	), true);
}

// We define our first stateful component.
class SlotMachine extends React.Component {
	constructor({ resultCount = 3 }) {
		super();
		let results = [];

		for (let i = 1; i <= resultCount; i += 1) {
			results.push(0);
		}

		// We specify the initial state of our component.
		// It is advised to add all the state variables that we will be using
		// for the rest of the component's lifetime. This is to aid debugging.
		this.state = {
			results,
			rolled: false, // Has user rolled at least once?
		};

		// This is required for every method definition, as ES6 classes do not
		// bind instance methods to their respective instances.
		this.spin = this.spin.bind(this);
	}

	spin() {
		const { images, resultCount } = this.props;
		let results = [];

		for (let i = 1; i <= resultCount; i += 1) {
			results.push(getRandomNumber(0, images.length));
		}

		this.setState({ results, rolled: true });
	}

	render() {
		const { images, resultCount } = this.props;
		const { results, rolled } = this.state;

		return (
			<React.Fragment>
				<div className="card-deck my-4">
					{
						results.map((result, i) => (
							<div key={i} className="card align-items-center" style={{ width: `${100 / resultCount}%` }}>
								<img className="card-img" style={{ height: 250 }} src={ images[result].src } alt={ result } />
							</div>
						))
					}
				</div>
				<div className="row my-4 align-items-center">
					<div className="col-9">
						{
							rolled && checkForWin(results) &&
							<span className="text-primary text-uppercase h1">
								You Win!!!!!!!!!!!!1111
							</span>
						}
					</div>
					<div className="col-3 text-right">
						{ /* Note that we are passing this.spin() as the function itself for onClick */ }
						<button className="btn btn-primary btn-block btn-lg" type="button" onClick={ this.spin }>Spin</button>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<h1>Slot Machine</h1>
			</div>
		</div>
		<div className="my-5">
			<div className="container">
				<SlotMachine images={ IMAGES } resultCount={ 3 }/>
			</div>
		</div>
	</React.Fragment>
);

export default App;
