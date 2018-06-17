import getAPI from '../services/API';

export function usersSetLoadingAction(bool) {
    return {
        type: 'USERS_SET_LOADING',
        isLoading: bool
    }
}

export function usersLoadCompleteAction(items) {
    return {
        type: 'USERS_LOADED',
        items
    }
}

export function usersLoadErrorAction(bool) {
    return {
        type: 'USERS_LOAD_ERROR',
        hasErrored: bool
    }
}

export function loadUsers(since = 0) {
    return (dispatch) => {
        dispatch(usersSetLoadingAction(true));
        getAPI()
            .all('users')
            .getAll({
                since
            })
            .then(result => result.body().map(v => v.data()))
            .then(users => dispatch(usersLoadCompleteAction(users)))
            .catch((err) => {
                console.error(err);
                return dispatch(usersLoadErrorAction(true));
            });
    }
}

export function loadMoreUsers(items = []) {
    return loadUsers(Math.max(...items.map(user => user.id)));
}

export const usersActionCreators= {
    loadMoreUsers,
    loadUsers
}

export default usersActionCreators;