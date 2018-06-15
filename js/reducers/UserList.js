export function listHasErrored(state = false, action) {
    switch (action.type) {
        case 'LIST_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function listIsLoading(state = true, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        case 'LIST_HAS_LOADED':
            return false;
        case 'LIST_HAS_ERRORED':
            return false;
        default:
            return state;
    }
}

export function listItems(state = [], action) {
    switch (action.type) {
        case 'LIST_HAS_LOADED':
            return (state || []).concat(action.items);

        default:
            return state;
    }
}

export function listSetOffset(state = 0, action) {
    switch (action.type) {
        case 'LIST_LOAD_MORE':
            return state || action.offset;
        default:
            return state;
    }
}

export default {
    hasErrored: listHasErrored,
    isLoading: listIsLoading,
    list: listItems,
    since: listSetOffset
}