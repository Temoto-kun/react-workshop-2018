import React from 'react';
import HELLO_WORLD_SRC from './assets/hello-world.png';

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<div className="mx-auto w-100" style={{ maxWidth: 500 }}>
					<img src={HELLO_WORLD_SRC} alt="Hello world" className="img-fluid" />
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default App;
