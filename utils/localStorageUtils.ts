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
    const mapAsArray = Array.from(map.entries());   // Convert the Map to an array of [key, value] pairs
    const jsonString = JSON.stringify(mapAsArray);  // Stringify the array to JSON
    localStorage.setItem(key, jsonString);
}


export function loadMapFromLocalStorage(key: string): Map<any, any> | undefined {
    const jsonString = localStorage.getItem(key);
    if (jsonString) {
        const mapAsArray = JSON.parse(jsonString);  // Parse the JSON string back into an array of [key, value] pairs
        return new Map(mapAsArray);                 // Convert the array back into a Map
    }
    return;
}


export function removeFromLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
