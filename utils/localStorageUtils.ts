// Code from Google Gemini (didn't bother changing, was good enough)

export function saveObjectToLocalStorage(key: string, object: any): void {
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString);
}


export function loadObjectFromLocalStorage(key: string): any | undefined {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        return JSON.parse(jsonString);
    }
    return;
}


export function saveMapToLocalStorage(key: string, map: Map<any, any>): void {
    let obj: Record<string, any> = {};

    for (let [k, v] of map.entries()) {
        if (v instanceof Map) {
            obj[k] = Object.fromEntries(v.entries());
        } else {
            obj[k] = v;
        }
    }

    localStorage.setItem(key, JSON.stringify(obj));
}


export function loadMapFromLocalStorage(key: string): Map<any, any> | undefined {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        const obj = JSON.parse(jsonString) as Record<string, any>;

        const isNested = Object.values(obj).some(value => value instanceof Object && value !== null && typeof value !== "boolean");

        if (isNested) {
            const outerMap = new Map<string, Map<any, any>>();
            for (let outerKey in obj) {
                outerMap.set(outerKey, new Map(Object.entries(obj[outerKey])));
            }
            return outerMap;
        }
        return new Map(Object.entries(obj));
    }
}


export function removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
