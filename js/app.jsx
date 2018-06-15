require('../sass/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './services/Store';

import {
    BrowserRouter as Router,
    Route,
    Switch,
} from 'react-router-dom'

import UserList from './components/UserList/UserList';
import UserPage from './components/UserPage/UserPage';

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
                <Router>
                    <Switch>
                        <Route path="/:user_id" exact name="User" component={UserPage}/>
                        <Route path="/" name="Home" component={UserList}/>
                    </Switch>
                </Router>

            </Provider>
        );
    }
}

ReactDOM.render(< App/>, document.getElementById('app'));
