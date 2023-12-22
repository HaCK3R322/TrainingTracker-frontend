import fetchGet from "./fetchGet";
import BackendUrls from "./BackendUrls.json";
import fetchPost from "./fetchPost";
import getJWT from "./getAuthorizationHeaderWithJWT";

export default function test() {
    fetchGet(BackendUrls.urls.trainings)
        .then(response => response.json())
        .then(trainings => {
            console.log(trainings)
            return trainings;
        })
        .then(trainings => {
            trainings.forEach(training => {
                let trainingId = training.id;
                fetchGet(BackendUrls.urls.exercises + "?trainingId=" + trainingId)
                    .then(response => response.json())
                    .then(exercises => {
                        exercises.forEach(exercise => {
                            let exerciseId = exercise.id;

                            fetchGet(BackendUrls.urls.sets + "?exerciseId=" + exerciseId)
                                .then(response => response.json())
                                .then(set => console.log(set))
                        })
                    })
            })

        })
}