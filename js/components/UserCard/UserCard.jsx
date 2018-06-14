require('./UserCard.scss');

import React from 'react';

export default class UserCard extends React.Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
    return (
      <div className="user-card">
        <a className="img-card" href="#">
          <img src={this.props.avatar_url || "http://via.placeholder.com/150x150"}/>
        </a>
        <div className="card-content">
          <h4 className="card-title">
            <a href="#">
              User id: {this.props.id || '1'}
            </a>
          </h4>
          <p className="">
            {this.props.login || 'Username'}
          </p>
        </div>
        <div className="card-read-more">
          <a href="#" className="btn btn-link btn-block">
            Details
          </a>
        </div>
      </div>
    )
  }
}