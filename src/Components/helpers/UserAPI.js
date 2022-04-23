let userLink

const apiUrls = {
    production: "https://adventureseekerapi.herokuapp.com/",
    development: "http://localhost:3001/"
}

if (window.location.hostname === "localhost") {
    userLink = apiUrls.development
} else {
    userLink = apiUrls.production
}

export default userLink