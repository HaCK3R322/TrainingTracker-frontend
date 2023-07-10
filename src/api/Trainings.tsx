import backendUrls from "./BackendUrls";
import Training from "./entities/Training";
import BackendExceptionResponse from "./entities/BackendExceptionResponse";
import getAuthorizationKey from "./GetAuthorizationKey";

function fetchCreateTraining(name: string): Promise<Training> {
    let key = getAuthorizationKey();

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', key);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(backendUrls.trainings, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({
            "name": name
        }),
        mode: 'cors'
    }).then(res => {
        if(res.status !== 201) {
            return res.json()
                .then(data => {
                    let errorMessage: string = (data as BackendExceptionResponse).message
                    throw new Error(errorMessage)
                })
        }
        return res.json()
    })
}

export default fetchCreateTraining;