/**
 * Underscore _.findWhere reinvented
 * @param arr
 * @param matchObject
 */
export const findWhere = (arr, matchObject) => (arr || []).reduce((match, obj) => {
    let keys = Object.keys(matchObject);
    for (let i = 0; i < keys.length; i++)
        if (String(obj[keys[i]]) !== String(matchObject[keys[i]]))
            return match;
    return obj;
}, null);


//prototypeJS-style function interception
Object.assign(Function.prototype, {
    wrap: function (wrapper) {
        let __method = this;
        if (!wrapper instanceof Function)
            return this;
        return function () {
            return wrapper.apply(this, [__method.bind(this), ...arguments]);
        }
    }
});