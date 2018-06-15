require('../sass/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './services/Store';
import UserList from './components/UserList/UserList';

const store = Store();

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <Provider store={store}>
                <UserList/>
            </Provider>
        );
    }
}

ReactDOM.render(< App/>, document.getElementById('app'));
