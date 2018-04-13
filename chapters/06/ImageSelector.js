// This is a simple image selector powered by radio buttons.
// We define this component for any set of images we want to use.

import React from 'react';

function ImageSelector({ images, name, label, id, value, onChange }) {
	return (
		<React.Fragment>
			<label htmlFor={ id }>{ label }</label>
			{
				images.map(image => (
					<label id={ id } key={ image.src }>
						<figure className={ value === image.src ? 'card position-relative border-primary' : 'card position-relative' }>
							<img className="card-img" src={image.src} alt={image.caption}/>
							<input
								type="radio"
								name={name}
								checked={ value === image.src }
								className="position-absolute"
								onClick={ () => onChange({ name, value: image.src }) }
								style={{ top: 15, right: 15 }}
							/>
						</figure>
					</label>
				))
			}
		</React.Fragment>
	);
}

export default ImageSelector;
