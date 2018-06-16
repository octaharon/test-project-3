import {
    combineReducers
} from 'redux';
import UsersReducers from './Users';

//Get state->props mapper for a given Reducers collection
export const mapStateToProps = (reducers) => (state) =>
    Object.keys(reducers).reduce((obj, key) =>
        Object.assign(obj, {
            [key]: state[key]
        }), {});


export default combineReducers(Object.assign({},
    UsersReducers,
    //...More reducers are added here
));