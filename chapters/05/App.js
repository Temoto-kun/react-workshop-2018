import React from 'react';
import LOSS_1 from './assets/loss-1.png';
import LOSS_2 from './assets/loss-2.png';
import LOSS_3 from './assets/loss-3.jpg';
import LOSS_4 from './assets/loss-4.jpg';
import NOT_LOSS_1 from './assets/not-loss-1.jpg';
import NOT_LOSS_2 from './assets/not-loss-2.jpg';
import NOT_LOSS_3 from './assets/not-loss-3.jpg';
import MemeWrapper from './MemeWrapper';

const MEMES = [
	{
		src: LOSS_1,
		isLoss: true,
	},
	{
		src: NOT_LOSS_1,
		isLoss: false,
	},
	{
		src: NOT_LOSS_2,
		isLoss: false,
	},
	{
		src: LOSS_4,
		isLoss: true,
	},
	{
		src: LOSS_2,
		isLoss: true,
	},
	{
		src: LOSS_3,
		isLoss: true,
	},

	{
		src: NOT_LOSS_3,
		isLoss: false,
	},
];

const App = (
	<React.Fragment>
		<div className="my-5">
			<div className="container">
				<MemeWrapper memes={ MEMES }/>
			</div>
		</div>
	</React.Fragment>
);

export default App;
