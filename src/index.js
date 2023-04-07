// libraries needed + bootstrap
import ReactDOMClient from 'react-dom/client';
import App from './App.js';
import 'bootstrap/dist/css/bootstrap.css';

// main container that is then put in root div in index.html
const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<App tab="home" />);

// During an update, there's no need to pass the container again.
root.render(<App tab="profile" />);

root.render(<MyForm />);