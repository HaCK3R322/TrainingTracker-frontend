import BackendUrls from "./BackendUrls.json";
import getAuthorizationHeaderWithJWT from "./getAuthorizationHeaderWithJWT";

export default function fetchPost(address, body) {
    let url = BackendUrls.host + address;
    let jwtHeader = getAuthorizationHeaderWithJWT();

    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', jwtHeader);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(url, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify(body),
        mode: 'cors'
    });
}