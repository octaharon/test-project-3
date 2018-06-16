export function usersErrored(state = false, action = null) {
    action = action || {};
    switch (action.type) {
        case 'USERS_LOAD_ERROR':
            return action.hasErrored;

        default:
            return state;
    }
}

export function usersLoading(state = true, action = null) {
    action = action || {};
    switch (action.type) {
        case 'USERS_SET_LOADING':
            return !!action.isLoading ;
        case 'USERS_LOADED':
            return false;
        case 'USERS_LOAD_ERROR':
            return false;
        default:
            return state;
    }
}

export function usersList(state = [], action = null) {
    action = action || {};
    switch (action.type) {
        case 'USERS_LOADED':
            return (state || []).concat(action.items);

        default:
            return state;
    }
}

export default {
    hasErrored: usersErrored,
    isLoading: usersLoading,
    list: usersList
}