require('./UserCard.scss');

import React from 'react';
import {Link} from 'react-router-dom';

export default class UserCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let userUrl = `/${this.props.id}`;
        return (
            <div className="user-card">
                <Link className="img-card" to={userUrl}>
                    <img src={this.props.avatar_url || "http://via.placeholder.com/150x150"}/>
                </Link>
                <div className="card-content">
                    <h4 className="card-title">
                        <Link to={userUrl}>
                            {this.props.login || 'Username'}
                        </Link>
                    </h4>
                    <p className="">
                        User id: {this.props.id || 'N/A'}
                    </p>
                </div>
                <div className="card-read-more">
                    <Link className="btn btn-link btn-block" to={userUrl}>
                        Details
                    </Link>
                </div>
            </div>
        )
    }
}