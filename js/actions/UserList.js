export function listIsLoadingAction(bool) {
    return {
        type: 'LIST_IS_LOADING',
        isLoading: bool
    }
}

export function listHasLoadedAction(items) {
    return {
        type: 'LIST_HAS_LOADED',
        items
    }
}

export function listHasErroredAction(bool) {
    return {
        type: 'LIST_HAS_ERRORED',
        hasErrored: bool
    }
}

export function listLoadMoreAction(items = []) {
    return {
        type: 'LIST_LOAD_MORE',
        offset: Math.max(...items.map(user => user.id))
    }
}

export default {
    listIsLoadingAction,
    listHasErroredAction,
    listHasLoadedAction,
    listLoadMoreAction
}
