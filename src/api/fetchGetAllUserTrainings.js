import fetchGet from "./fetchGet";
import BackendUrls from "./BackendUrls.json";


export default function fetchGetAllUserTrainings() {
    return fetchGet(BackendUrls.urls.trainings)
        .then(response => response.json());
}