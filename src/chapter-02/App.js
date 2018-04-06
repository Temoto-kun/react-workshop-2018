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
				<div className="row">
					<div className="col-6">
						<div className="my-2">
							<HenloImage src={BIRD_SRC} caption="Bird" />
						</div>
					</div>
					<div className="col-6">
						<div className="my-2">
							<HenloImage src={LIZARD_SRC} caption="Lizard" />
						</div>
					</div>
					<div className="col-6">
						<div className="my-2">
							<HenloImage src={PEACH_SRC} caption="Peach" />
						</div>
					</div>
					<div className="col-6">
						<div className="my-2">
							<HenloImage src={RABBIT_SRC} caption="Rabbit" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default App;
