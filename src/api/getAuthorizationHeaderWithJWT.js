export default function getAuthorizationHeaderWithJWT() {
    const JWT = window.localStorage.getItem("JWT");
    return "Bearer " + JWT
}