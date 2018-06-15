import {combineReducers} from 'redux';
import UserListReducers from './UserList';

export const mapStateToProps = (reducers) => (state) =>
    Object.keys(reducers).reduce((obj, key) =>
            Object.assign(obj, {
                [key]: state[key]
            })
        , {});


export default combineReducers(Object.assign({},
    UserListReducers
));