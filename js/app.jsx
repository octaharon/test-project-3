require('../sass/app.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import API from './services/API'

import UserCard from './components/UserCard/UserCard';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    setTimeout(() => {
      API
        .all('users')
        .getAll({'since': 0})
        .then(result => {
          let users = result
            .body()
            .map(v => v.data());
          console.log(users);
          this.setState({loading: false, users});
        })
        .catch(console.error);
    }, 2000);
  }

  render() {
    return this.state.loading
      ? (
        <div id='preloader'></div>
      )
      : (
        <section className="wrapper">
          <div className="container ">
            <div className="row">
              <h1 className="heading">
                User list
              </h1>
            </div>
            <div className="content row">
              <div className="container">
                <div className="row">
                  {this
                    .state
                    .users
                    .map(user => (
                      <div className="col-xs-12 col-sm-4" key={user.id}>
                        <UserCard {...user}/>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
  }
}

ReactDOM.render(< App />, document.getElementById('app'));
