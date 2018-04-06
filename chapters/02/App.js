import React from 'react';
import BIRD_SRC from './assets/bird.jpeg';
import LIZARD_SRC from './assets/lizard.png';
import PEACH_SRC from './assets/peach.png';
import RABBIT_SRC from './assets/rabbit.png';

function HenloImage({ src, caption }) {
	return (
		<figure className="card">
			<img className="card-img-top" src={src} alt={caption}/>
			<figcaption className="card-body">
				<span className="card-title">{ caption }</span>
			</figcaption>
		</figure>
	);
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
				<div className="card-columns">
					<HenloImage src={BIRD_SRC} caption="Bird" />
					<HenloImage src={LIZARD_SRC} caption="Lizard" />
					<HenloImage src={PEACH_SRC} caption="Peach" />
					<HenloImage src={RABBIT_SRC} caption="Rabbit" />
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default App;
