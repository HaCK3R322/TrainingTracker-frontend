import dayjs from "dayjs";

function transformFetchedDataToExercises(fetchedData) {
    console.log("Fetched data:", fetchedData)

    let exercises = []
    for (const exerciseData of fetchedData) {
        let exercise = exerciseData.exercise

        exercise.sets = exerciseData.sets
        exercise.timestamp = dayjs(exercise.timestamp)

        exercises.push(exercise)
    }

    console.log("Exercises array:", exercises)

    return exercises
}

export default transformFetchedDataToExercises