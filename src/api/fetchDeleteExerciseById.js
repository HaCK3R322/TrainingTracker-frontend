import BackendUrls from "./BackendUrls.json";
import getAuthorizationHeaderWithJWT from "./getAuthorizationHeaderWithJWT";

export default function(exerciseId) {
    let url = BackendUrls.host + BackendUrls.urls.exercises + "?exerciseId=" + exerciseId;
    let jwtHeader = getAuthorizationHeaderWithJWT();

    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', jwtHeader);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(url, {
        headers: requestHeaders,
        method: "DELETE",
        mode: 'cors'
    });
}