// let host: string = "http://localhost:8080"
let host: string = "http://ivanandrosovv.ru:8080"

let urls = {
    register: host + "/register",
    authenticate: host + "/authenticate",

    trainings: host + "/tracking/trainings",
    exercises: host + "/tracking/exercises",
    sets: host + "/tracking/sets"
}

export default urls;