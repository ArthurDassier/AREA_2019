export function getValue(obj) {
    return (Object.values(obj)[0]);
}

export function getName(obj) {
    return (Object.keys(obj)[0]);
}

export function isObjectEmpty(obj) {
    return (Object.entries(obj).length === 0 && obj.constructor === Object);
}

export function isArrayEmpty(arr) {
    return !(Array.isArray(arr) && arr.length);
}

export function getObjName(obj) {
    if (obj.hasOwnProperty('name')) {
        return obj.name;
    } else if (obj.hasOwnProperty('title')) {
        return obj.title;
    } else {
        return obj.description;
    }
}
