import React from 'react';
import BIRD_SRC from '../02/assets/bird.jpeg';
import BIRD2_SRC from '../02/assets/bird2.png';
import DOG_SRC from '../02/assets/dog.jpg';
import LIZARD_SRC from '../02/assets/lizard.png';
import PEACH_SRC from '../02/assets/peach.png';
import RABBIT_SRC from '../02/assets/rabbit.png';

const IMAGES = [
	{
		src: BIRD_SRC,
		caption: 'Bird',
	},
	{
		src: BIRD2_SRC,
		caption: 'Another Bird',
	},
	{
		src: DOG_SRC,
		caption: 'Dog',
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

function getRandomNumber(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

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

class SlotMachine extends React.Component {
	constructor({ resultCount = 3 }) {
		super();
		let results = [];

		for (let i = 1; i <= resultCount; i += 1) {
			results.push(0);
		}

		this.state = {
			results,
			rolled: false,
		};

		this.spin = this.spin.bind(this); // (1)
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
