import fetchPost from "../../api/fetchPost";
import BackendUrls from "../../api/BackendUrls.json";
import dayjs from "dayjs";

function fetchCreateNewExercise(exerciseBody)  {
    console.log("Fetching new exercise data to server:", exerciseBody)

    return fetchPost(BackendUrls.urls.exercises, exerciseBody)
        .then(response => response.json())
        .then(createdExercise => {
            createdExercise.sets = []
            createdExercise.timestamp = dayjs(createdExercise.timestamp)
            return createdExercise
        })
}

export default fetchCreateNewExercise