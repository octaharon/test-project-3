import restful, {fetchBackend} from 'restful.js';
import React from 'react';

let instance = null;

const url = 'https://api.github.com';
const getAPI = function () {
    if (!instance)
        return instance = restful(url, fetchBackend(fetch));
    return instance;
};

export function withAPI(WrappedComponent) {
    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <WrappedComponent {...this.props} API={getAPI()}/>
            );
        }
    }
}

export default getAPI;