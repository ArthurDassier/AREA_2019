let accessToken;
export function setAccessToken(access_token) {
    accessToken = access_token;
}

export function getAccessToken() {
    return accessToken;
}

export function getSizeByPercentage(total, value) {
    let result = Math.round(total - (total * value));
    return result;
}

export function getSizeDifferenceByPercentage(total, value) {
    let result = Math.round(total - getSizeByPercentage(total, value));
    return result;
}