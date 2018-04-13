import React from 'react';
import BIRD_SRC from '../02/assets/bird.jpeg';
import BIRD2_SRC from '../02/assets/bird2.png';
import DOG_SRC from '../02/assets/dog.jpg';
import LIZARD_SRC from '../02/assets/lizard.png';
import PEACH_SRC from '../02/assets/peach.png';
import RABBIT_SRC from '../02/assets/rabbit.png';

// Let's reuse the HenloImage component from the previous chapter.
// In the presentation, the component is also defined here,
// but the structure is the same.
import { HenloImage } from '../02/App';

// We define the list of images now.
const IMAGES = [
	{
		src: BIRD_SRC,
		caption: 'Bird',
	},
	{
		src: BIRD2_SRC,
		caption: 'Another Bird',
	},
	{
		src: DOG_SRC,
		caption: 'Dog',
	},
	{
		src: LIZARD_SRC,
		caption: 'Lizard',
	},
	{
		src: PEACH_SRC,
		caption: 'Peach',
	},
	{
		src: RABBIT_SRC,
		caption: 'Rabbit',
	}
];

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
					{
						/* Let's map each image datum to render to each HenloImage component. */
						IMAGES.map(image => (
							/*
							 * Notice the additional "key" prop. It is advised by React to add
							 * this prop to each element/component for every .map() for tracking.
							 */
							<HenloImage key={image.src} src={image.src} caption={image.caption} />
						))
					}
				</div>
			</div>
		</div>
	</React.Fragment>
);

export default App;

// Let's export the images now for later chapters.
export { IMAGES };
