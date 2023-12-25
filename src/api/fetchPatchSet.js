import BackendUrls from "./BackendUrls.json";
import getAuthorizationHeaderWithJWT from "./getAuthorizationHeaderWithJWT";

export default function fetchPatchSet(newSet) {
    let url = BackendUrls.host + BackendUrls.urls.sets;
    let jwtHeader = getAuthorizationHeaderWithJWT();

    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', jwtHeader);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(url, {
                headers: requestHeaders,
                method: "PATCH",
                body: JSON.stringify(newSet),
                mode: 'cors'
            })
        .then(response => {
            if(!response.ok) {
                response.text().then(text => console.log(text))
            } else {
                return response;
            }
        })
}