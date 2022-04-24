let userLink

const apiUrls = {
    production: "https://smartdocxs-api-auth.herokuapp.com/",
    development: "http://localhost:3001/"
}

if (window.location.hostname === "localhost") {
    userLink = apiUrls.development
} else {
    userLink = apiUrls.production
}

export default userLink