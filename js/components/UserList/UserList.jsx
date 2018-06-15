require('./UserList.scss');

import UserListActions from '../../actions/UserList';
import UserListReducers from '../../reducers/UserList';
import {mapStateToProps} from "../../reducers/index";

import UserCard from '../UserCard/UserCard';

import {withAPI} from "../../services/API";
import {connect} from 'react-redux';
import React from 'react';

@withAPI
class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.list || !this.props.list.length)
            setTimeout(() => this.loadData(), 2000); //to enjoy the preloader
    }

    componentDidUpdate(prevProps) {
        if (this.props.since > (prevProps.since || 0)) {
            this.loadData();
        }

    }

    loadData({since = 0, API, dispatch} = this.props) {
        dispatch(UserListActions.listIsLoadingAction(true));
        API
            .all('users')
            .getAll({since})
            .then(result => result.body().map(v => v.data()))
            .then(users => dispatch(UserListActions.listHasLoadedAction(users)))
            .catch((err) => {
                console.error(err);
                return dispatch(UserListActions.listHasErroredAction(true));
            });
    }

    loadMore({dispatch, list, isLoading} = this.props) {
        if (isLoading)
            return false;
        dispatch(UserListActions.listLoadMoreAction(list));
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


export default connect(mapStateToProps(UserListReducers))(UserList)

