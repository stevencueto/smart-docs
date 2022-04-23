let socketLink

const apiUrls = {
    production: "https://adventureseekerapi.herokuapp.com/",
    development: "http://localhost:3002/"
}

if (window.location.hostname === "localhost") {
    socketLink = apiUrls.development
} else {
    socketLink = apiUrls.production
}

export default socketLink