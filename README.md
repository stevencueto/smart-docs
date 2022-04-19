# smart-docs
# smart-docs
Smart Docs is a google docs clone app but better, that would allow users to store doc files, edit them, share them and more.
the technologies I will be using are MongoDB, React Quill, Exprex.Js, React.Js.


The models the app will have will be:
const Document = new Schema({
  data:{type: Object},
   user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
allowedUsers:[ 
        {
        type: Schema.Types.ObjectId,
        ref: 'Document',
        }
    ],
public:[ 
        {
        type: Boolean,
        default: false,
        }
    ],
})
})
,
const User = new Schema({
    name: {
        type: String,
        required: true,
        min: 5
    },documensts:[
    }, email:{
            type: String,
            },
    password:{
            type:String,
            required: true,
     },
    profilePicture: {
        type: Image
    },})
    
 #Stretch Goals:
 social meadia login, have multiple users edit the same file at the same time, improve prevous projects, Three.js integration
