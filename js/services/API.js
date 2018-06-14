import restful, {fetchBackend} from 'restful.js';

let url = 'https://api.github.com';
let instance = restful(url, fetchBackend(fetch));

export default instance;