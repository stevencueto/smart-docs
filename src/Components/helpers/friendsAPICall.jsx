let friendsLink

const apiUrls = {
    production: "",
    development: "http://localhost:3004/"
}

if (window.location.hostname === "localhost") {
    friendsLink = apiUrls.development
} else {
    friendsLink = apiUrls.production
}

export default friendsLink