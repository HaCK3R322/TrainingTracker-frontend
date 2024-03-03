import BackendUrls from "./BackendUrls.json";
import getAuthorizationHeaderWithJWT from "./getAuthorizationHeaderWithJWT";

export default function fetchDeleteSet(set) {
    let url = BackendUrls.host + BackendUrls.urls.sets + "?setId=" + set.id;
    let jwtHeader = getAuthorizationHeaderWithJWT();

    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', jwtHeader);
    requestHeaders.set('Content-type', 'application/json');

    // eslint-disable-next-line no-unused-vars
    const ignored = fetch(url, {
        headers: requestHeaders,
        method: "DELETE",
        mode: 'cors'
    });
}