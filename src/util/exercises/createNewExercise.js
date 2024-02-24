import fetchPost from "../../api/fetchPost";
import BackendUrls from "../../api/BackendUrls.json";
import dayjs from "dayjs";

function createNewExercise(trainingId, name, units, timestamp)  {
    let newExerciseBody = {
        name: name,
        units: units,
        trainingId: trainingId,
        timestamp: timestamp
    }

    console.log("Fetching new exercise data to server:")
    console.log(newExerciseBody)

    return fetchPost(BackendUrls.urls.exercises, newExerciseBody)
        .then(response => response.json())
        .then(createdExercise => {
            createdExercise.sets = []
            createdExercise.timestamp = dayjs(createdExercise.timestamp)
            return createdExercise
        })
}

export default createNewExercise