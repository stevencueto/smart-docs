let docsLink

const apiUrls = {
    production: "https://adventureseekerapi.herokuapp.com/",
    development: "http://localhost:3003/"
}

if (window.location.hostname === "localhost") {
    docsLink = apiUrls.development
} else {
    docsLink = apiUrls.production
}

export default docsLink