import React from 'react';

function Person({ name, image, ...props }) {
	return (
		<figure className="card" { ...props }>
			<img className="card-img-top" src={ image } alt={ name } />
			<figcaption className="card-body">
				<p className="card-text">{ name }</p>
			</figcaption>
		</figure>
	);
}

export default Person;
