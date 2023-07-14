import backendUrls from "./BackendUrls";
import Exercise from "./entities/Exercise";
import BackendExceptionResponse from "./entities/BackendExceptionResponse";
import getAuthorizationKey from "./GetAuthorizationKey";

function fetchCreateExercise(name: string, units: string, trainingId: number): Promise<Exercise> {
    let key = getAuthorizationKey();

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', key);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(backendUrls.exercises, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({
            "name": name,
            "units": units,
            "trainingId": trainingId
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

function fetchGetAllExercisesByTrainingId(trainingId: number): Promise<Exercise[]> {
    let key = getAuthorizationKey();

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', key);
    requestHeaders.set('Content-type', 'application/json');

    let url = backendUrls.exercises + "?trainingId=" + trainingId;

    return fetch(url, {
        headers: requestHeaders,
        method: "GET",
        mode: 'cors'
    }).then(res => {
        if(res.status !== 200) {
            return res.json()
                .then(data => {
                    let errorMessage: string = (data as BackendExceptionResponse).message
                    throw new Error(errorMessage)
                })
        }
        return res.json()
    })
}

export {fetchCreateExercise, fetchGetAllExercisesByTrainingId};