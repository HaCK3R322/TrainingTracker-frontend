import backendUrls from "./BackendUrls";
import Set from "./entities/Set";
import BackendExceptionResponse from "./entities/BackendExceptionResponse";
import getAuthorizationKey from "./GetAuthorizationKey";
import Exercise from "./entities/Exercise";

function fetchCreateSet(amount: number,
                        reps: number,
                        timestamp: string,
                        exerciseId: number): Promise<Set> {
    let key = getAuthorizationKey();

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', key);
    requestHeaders.set('Content-type', 'application/json');

    return fetch(backendUrls.trainings, {
        headers: requestHeaders,
        method: "POST",
        body: JSON.stringify({
            "amount": amount,
            "reps": reps,
            "timestamp": timestamp,
            "exerciseId": exerciseId
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

// fetch get all sets by exercise id
function fetchGetAllSetsByExerciseId(exerciseId: number): Promise<Set[]> {
    let key = getAuthorizationKey();

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Authorization', key);
    requestHeaders.set('Content-type', 'application/json');

    let url = backendUrls.sets + "?exerciseId=" + exerciseId;

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

export {fetchCreateSet, fetchGetAllSetsByExerciseId};