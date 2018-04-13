// When using JSX, we need to import React because it is needed after compilation.
import React from 'react';

// We can't do this in normal JavaScript, but our build configuration allows us to.
import HELLO_WORLD_SRC from './assets/hello-world.png';

// And so lay out the simple app.
const App = (
	// React.Fragment is a component that is present since React 16. It represents a
	// component without a visible element of its own--only its children will be
	// rendered
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

// Export the app layout.
export default App;
