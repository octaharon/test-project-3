require('./UserPage.scss');

import React from 'react';
import {findWhere} from "../../services/utils";
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // user: {}
        };
    }

    static getDerivedStateFromProps(props) {
        return {
            user: findWhere(props.list, {id: props.match.params.user_id}) || {}
        }
    }

    render() {
        if (!this.state.user)
            return <div id='preloader'/>;
        if (!this.state.user.id)
            return <Redirect to="/"/>;
        let user = this.state.user;

        return (
            <section className="userpage">
                <div className="container ">
                    <div className="row row-top">
                        <a
                            className="btn btn-info back"
                            href="javascript:;"
                            onClick={(e) => history.back()}>
                            &lt; Back
                        </a>
                        <h1 className="heading">
                            {user.login}
                        </h1>
                    </div>
                    <div className="content row ">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-sm-6 col-md-3 user-picture">
                                    <img src={user.avatar_url || "http://via.placeholder.com/300x300"}/>
                                </div>
                                <div className="col-xs-12 col-sm-6 col-md-9 user-data">
                                    <ul className="list-group">
                                        <li className="list-group-item">Personal page: <a
                                            href={user.url}>{user.url}</a>
                                        </li>
                                        <li className="list-group-item">Id: {user.id}</li>
                                        <li className="list-group-item">Type: {user.type}</li>
                                        <li className="list-group-item">Is admin:
                                            {user.site_admin ? 'Yes' : 'No'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}


export default connect((state) => ({
    list: state.list || []
}))(UserPage);