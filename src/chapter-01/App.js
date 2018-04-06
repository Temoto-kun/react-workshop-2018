import React from 'react';
import HELLO_WORLD_SRC from './assets/hello-world.png';

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<h1>Hello&hellip;World</h1>
			</div>
		</div>
		<div className="my-5">
			<div className="container">
				<img src={HELLO_WORLD_SRC} alt="Hello world" className="img-fluid" />
			</div>
		</div>
	</React.Fragment>
);

export default App;
