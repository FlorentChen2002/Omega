//require ('./service/index_app.js');
const connectToDB = require ('./middleware/db.js');
const api_user = require ('./middleware/api_user.js');
const api_forum = require ('./middleware/api_forum.js');
const api_admin = require ('./middleware/api_admin.js');
const api_message_private = require ('./middleware/api_message_private.js');
express = require ('express');
const app = express();
const session = require ('express-session');
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
app.use(session({
    secret : "technoweb",
    resave : true,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Mettez à true si vous êtes en HTTPS
        httpOnly: true,
        maxAge: 60 * 60 * 1000, // 1 heures
        sameSite: 'lax'
      }
}));
connectToDB().then((MongoClient)=> {
    //app.use("/api",api.default(MongoClient));
    app.use("/api/user", api_user.default(MongoClient));
    app.use("/api/forum", api_forum.default(MongoClient));
    app.use("/api/admin", api_admin.default(MongoClient));
    app.use("/api/messages_private", api_message_private.default(MongoClient));
    app.listen(8000,() => {
        console.log("Authentification !");
    });
});