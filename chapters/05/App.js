import React from 'react';
import LOSS_1 from './assets/loss-1.png';
import LOSS_2 from './assets/loss-2.png';
import LOSS_3 from './assets/loss-3.jpg';
import LOSS_4 from './assets/loss-4.jpg';
import NOT_LOSS_1 from './assets/not-loss-1.jpg';
import NOT_LOSS_2 from './assets/not-loss-2.jpg';
import NOT_LOSS_3 from './assets/not-loss-3.jpg';

const MEMES = [
	{
		src: LOSS_1,
		isLoss: true,
	},
	{
		src: NOT_LOSS_1,
		isLoss: false,
	},
	{
		src: NOT_LOSS_2,
		isLoss: false,
	},
	{
		src: LOSS_4,
		isLoss: true,
	},
	{
		src: LOSS_2,
		isLoss: true,
	},
	{
		src: LOSS_3,
		isLoss: true,
	},

	{
		src: NOT_LOSS_3,
		isLoss: false,
	},
];

class MemeWrapper extends React.Component {
	constructor({ memes }) {
		super();
		this.state = {
			memes,
		};
		this.answer = this.answer.bind(this);
	}

	answer({ src, answer }) {
		this.setState(({ memes }) => ({
			memes: memes.map(meme => (
				src !== meme.src ? ({ ...meme, lastAnswered: false }) : ({ ...meme, answer, lastAnswered: true })
			))
		}));
	}

	render() {
		const { memes } = this.state;
		return (
			<div className="card-columns">
				{
					memes
						.filter(meme => meme.isLoss !== meme.answer)
						.map(meme => (
							<Meme
								key={meme.src}
								src={meme.src}
								caption={meme.caption}
								isLoss={meme.isLoss}
								answer={meme.answer}
								lastAnswered={meme.lastAnswered}
								onAnswer={ this.answer }
								onWrong={ this.revertAnswer }
							/>
					))
				}
			</div>
		)
	}
}

class Meme extends React.Component {
	constructor() {
		super();
		this.state = {
			wrong: 0
		}
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	componentDidMount() {
		console.log('componentDidMount');
	}

	componentWillReceiveProps(props) {
		console.log('componentWillReceiveProps');
		if (props.lastAnswered && typeof props.answer === 'boolean' && props.answer !== props.isLoss) {
			window.alert('Incorrect!');
			this.setState(({ wrong }) => ({
				wrong: wrong + 1
			}));
		}
	}

	componentDidUpdate() {
		console.log('componentDidUpdate');
	}

	componentWillUnmount() {
		console.log('componentWillUnmount');
		window.alert('Correct!');
	}

	render() {
		const { src, isLoss, onAnswer } = this.props;
		const { wrong } = this.state;
		return (
			<figure className="card">
				<img src={ src } alt={ src } className="card-img"/>
				<figcaption className="card-body">
					<p>Is this loss????</p>
					<small>
						Incorrect tries: { wrong }
					</small>
				</figcaption>
				<div className="card-footer">
					<div className="row">
						<div className="col-6">
							<button className="btn btn-success btn-block" type="button" onClick={ () => onAnswer({ src, isLoss, answer: true }) }>Yes</button>
						</div>
						<div className="col-6">
							<button className="btn btn-danger btn-block" type="button" onClick={ () => onAnswer({ src, isLoss, answer: false }) }>No</button>
						</div>
					</div>
				</div>
			</figure>
		);
	}
}

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<MemeWrapper memes={ MEMES }/>
			</div>
		</div>
	</React.Fragment>
);

export default App;
