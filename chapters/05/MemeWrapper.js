// Good practice is we keep at most one component for each file.
// There are other ways of splitting code and grouping related components
// but for the sake of brevity, we keep it simple so files correspond to components.

import React from 'react';
import Meme from './Meme';

// This is a simple component which lists all the memes that are passed via props.

// It handles answering of "IS THIS LOSS?????" so we can demonstrate passing props
// from this component to its child Meme components.
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
			// Notice we don't modify the state directly.
			// React embraces the concept of immutability
			// such that for every modification, we don't
			// run into unintentional side effects which
			// make debugging harder.
			memes: memes.map(meme => (
				src !== meme.src ?
					({ ...meme, lastAnswered: false }) :
					({ ...meme, answer, lastAnswered: true })
			))
		}));
	}

	render() {
		const { memes } = this.state;
		return (
			<div className="card-columns">
				{
					/*
					 * We only display memes that are answered correctly
					 * with "IS THIS LOSS?????"
					 *
					 * I  Ii
					 * II I_
					 */
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
							/>
						))
				}
			</div>
		)
	}
}

export default MemeWrapper;
