import BackendUrls from "./BackendUrls.json";
import getAuthorizationHeaderWithJWT from "./getAuthorizationHeaderWithJWT";

/**
 * Puts exercise - exercise with corresponding id updates name, units and timestamp
 * @param exercise - exercise to put
 * @returns {Promise<Response>}
 */
export default function fetchExercisePut(exercise) {
    let url = BackendUrls.host + BackendUrls.urls.exercises;
    let jwtHeader = getAuthorizationHeaderWithJWT();

    const requestHeaders = new Headers();
    requestHeaders.set('Authorization', jwtHeader);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(url, {
        headers: requestHeaders,
        method: "PUT",
        body: JSON.stringify(exercise),
        mode: 'cors'
    });
}