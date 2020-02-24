import Immutable from 'immutable';
export declare function isColumnsImmutable(columns: unknown): columns is Immutable.List<unknown>;
export declare function isEmptyArray(obj: unknown): boolean;
export declare function isFunction<T>(functionToCheck: T): boolean;
export declare function isEmptyObject<T extends {}>(obj: T): boolean;
export declare function isImmutableCollection<T>(objToVerify: T): boolean;
export declare function getMixedTypeValueRetriever(isImmutable: boolean): {
    getValue: ((immutable: Immutable.Map<string, unknown>, key: string) => unknown) | (<T>(item: T, key: keyof T) => T[keyof T]);
};
export declare const isImmutableMap: typeof Immutable.Map.isMap;
