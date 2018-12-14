import React from 'react';
import ReactDOM from 'react-dom';

import 'material-components-web/dist/material-components-web.min.css';

import './index.css';
import FriendSecretContainer from './FriendSecretContainer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<FriendSecretContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
