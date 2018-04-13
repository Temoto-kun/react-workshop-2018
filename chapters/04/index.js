// We need ReactDOM to render our template.
import ReactDOM from 'react-dom';
import 'style';

// Import the app layout.
import App from './App';

// Set the mount target.
const ROOT = window.document.getElementById('root');

// And we're done.
ReactDOM.render(App, ROOT);
