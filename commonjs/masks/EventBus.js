"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var EventBus = /** @class */ (function () {
    function EventBus() {
        this.subscribers = new Map();
    }
    EventBus.prototype.subscribe = function (type, handler) {
        if (!this.subscribers.has(type)) {
            this.subscribers.set(type, new Set());
        }
        var handlers = this.subscribers.get(type);
        handlers.add(handler);
        return function () {
            handlers.delete(handler);
        };
    };
    EventBus.prototype.dispatch = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var handlers = this.subscribers.get(type);
        if (handlers) {
            // handler needed a type assertion to fix type bug
            handlers.forEach(function (handler) { return handler.apply(void 0, tslib_1.__spread(args)); });
        }
    };
    return EventBus;
}());
exports.default = EventBus;
//# sourceMappingURL=EventBus.js.map