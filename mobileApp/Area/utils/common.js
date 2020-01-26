export function getSizeByPercentage(total, value) {
    let result = Math.round(total - (total * value));
    return result;
}

export function getSizeDifferenceByPercentage(total, value) {
    let result = Math.round(total - getSizeByPercentage(total, value));
    return result;
}