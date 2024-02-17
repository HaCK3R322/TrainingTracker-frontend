import fetchGet from "./fetchGet";
import BackendUrls from "./BackendUrls.json";

export default function fetchGetAllExercisesWithSetsByTrainingId(trainingId) {
    return fetchGet(BackendUrls.urls.sets + "?trainingId=" + trainingId)
        .then(response => response.json());
}