# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


### smart-docs
Smart Docs is a google docs clone app but better, that would allow users to store doc files, edit them, share them and more. the technologies I will be using are MongoDB, React Quill, Exprex.Js, React.Js.

The models the app will have will be: const Document = new Schema({ data:{type: Object}, user: { type: Schema.Types.ObjectId, ref: "User", required: true, }, allowedUsers:[ { type: Schema.Types.ObjectId, ref: 'Document', } ], public:[ { type: Boolean, default: false, } ], }) }) , const User = new Schema({ name: { type: String, required: true, min: 5 },documensts:[ }, email:{ type: String, }, password:{ type:String, required: true, }, profilePicture: { type: Image },})

#Stretch Goals: social meadia login, have multiple users edit the same file at the same time, improve prevous projects, Three.js integration


This App is a microservices app

docs api link [https://smart-docs-doc-server.herokuapp.com/][https://github.com/stevencueto/smart-docs-backend]
friends api [https://smart-docx-friends-server.herokuapp.com/][https://github.com/stevencueto/smart-docs-friends]
socket api [https://smart-docs-socket-data.herokuapp.com/][https://github.com/stevencueto/smart-docxs-doc-io-server]
[https://github.com/stevencueto/smart-docs-server-documents]
[https://github.com/stevencueto/smart-docs-backend]
user api [https://smartdocxs-api-auth.herokuapp.com/]