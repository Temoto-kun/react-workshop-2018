import React from 'react';

// This component is for memes, wherein we answer if the meme is LOSS or not.

// Check your browser console on how component lifecycle methods are executed in order.
class Meme extends React.Component {
	constructor() {
		super();
		this.state = {
			wrong: 0 // We keep "incorrect tries" for each attempt in answering wrongly.
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

export default Meme;
