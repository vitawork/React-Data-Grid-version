"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var immutable_1 = tslib_1.__importDefault(require("immutable"));
function isColumnsImmutable(columns) {
    return immutable_1.default.List.isList(columns);
}
exports.isColumnsImmutable = isColumnsImmutable;
function isEmptyArray(obj) {
    return Array.isArray(obj) && obj.length === 0;
}
exports.isEmptyArray = isEmptyArray;
function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}
exports.isFunction = isFunction;
function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
exports.isEmptyObject = isEmptyObject;
function isImmutableCollection(objToVerify) {
    return immutable_1.default.Iterable.isIterable(objToVerify);
}
exports.isImmutableCollection = isImmutableCollection;
function getMixedTypeValueRetriever(isImmutable) {
    return {
        getValue: isImmutable
            ? function (immutable, key) { return immutable.get(key); }
            : function (item, key) { return item[key]; }
    };
}
exports.getMixedTypeValueRetriever = getMixedTypeValueRetriever;
exports.isImmutableMap = immutable_1.default.Map.isMap;
//# sourceMappingURL=index.js.map