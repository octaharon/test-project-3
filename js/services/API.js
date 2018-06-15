import restful, {fetchBackend} from 'restful.js';
import React from 'react';

let url = 'https://api.github.com';
let instance = null;
let API = function () {
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
                <WrappedComponent {...this.props} API={API()}/>
            );
        }
    }
}

export default API;