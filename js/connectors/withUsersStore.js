import {
    connect
} from 'react-redux';
import UsersActions from '../actions/Users';
import UsersReducers from '../reducers/Users';
import {
    mapStateToProps
} from "../reducers/index";

export const withUserStore = (Component) => connect(
    mapStateToProps(UsersReducers),
    UsersActions
)(Component);

export default withUserStore;