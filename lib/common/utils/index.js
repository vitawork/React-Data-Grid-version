import Immutable from 'immutable';
export function isColumnsImmutable(columns) {
    return Immutable.List.isList(columns);
}
export function isEmptyArray(obj) {
    return Array.isArray(obj) && obj.length === 0;
}
export function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
export function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
export function isImmutableCollection(objToVerify) {
    return Immutable.Iterable.isIterable(objToVerify);
}
export function getMixedTypeValueRetriever(isImmutable) {
    return {
        getValue: isImmutable
            ? function (immutable, key) { return immutable.get(key); }
            : function (item, key) { return item[key]; }
    };
}
export var isImmutableMap = Immutable.Map.isMap;
//# sourceMappingURL=index.js.map