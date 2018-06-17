require('./UserList.scss');

import UserCard from '../UserCard/UserCard';
import withUsersStore from '../../connectors/withUsersStore';

import React from 'react';

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.list || !this.props.list.length)
            setTimeout(() => this.loadData(), 2000); //to enjoy the preloader
    }

    loadData({since = 0,loadUsers} = this.props) {
        loadUsers(since);
    }

    loadMore({loadMoreUsers, list, isLoading} = this.props) {
        if (isLoading)
            return false;
        loadMoreUsers(list);
    }

    render() {

        if (this.props.list && this.props.list.length) {
            return (
                <section className="userlist">
                    <div className="container ">
                        <div className="row">
                            <h1 className="heading">
                                GitHub users
                            </h1>
                        </div>
                        <div className="content row ">
                            <div className="container">
                                <div className="row ">
                                    {this.props.hasErrored ? (
                                        <div className="error">There was an error fetching GitHub API, check the
                                            console</div>) : this
                                        .props
                                        .list
                                        .map(user => (
                                            <div className="col-xs-12 col-sm-4" key={user.id}>
                                                <UserCard {...user}/>
                                            </div>
                                        ))}
                                </div>
                                {!this.props.hasErrored && (
                                    <div className="row col-12 text-center buttons">
                                        <a className={`btn btn-primary ${this.props.isLoading ? 'disabled' : ''}`}
                                           href="javascript:;"
                                           onClick={e => this.loadMore()}>Load more...</a>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </section>
            );
        }


        return <div id='preloader'/>;
    }
}

export {UserList};

export default withUsersStore(UserList);

