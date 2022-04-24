let docsLink

const apiUrls = {
    production: "https://smart-docs-doc-server.herokuapp.com/",
    development: "http://localhost:3003/"
}

if (window.location.hostname === "localhost") {
    docsLink = apiUrls.development
} else {
    docsLink = apiUrls.production
}

export default docsLink