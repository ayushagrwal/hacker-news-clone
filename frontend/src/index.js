/**
 * Application entry point 
 * Sets up React with Redux for state management
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // Wrap the app in Redux Provider to make the store available throughout the app
    <Provider store={store}>
        <App />
    </Provider>
);
