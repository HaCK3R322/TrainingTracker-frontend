import fetchGet from "./fetchGet";
import BackendUrls from "./BackendUrls.json";


export default function fetchGetAllExercisesWithSetsByTrainingId(trainingId) {
    return fetchGet(BackendUrls.urls.exercises + "?trainingId=" + trainingId + "&withSets=true")
        .then(response => response.json());
}