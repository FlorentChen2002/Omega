//require ('./service/index_app.js');
const connectToDB = require ('./middleware/db.js');
const api = require ('./middleware/api.js');
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
        maxAge: 60 * 60 * 1000, // 24 heures
        sameSite: 'lax'
      }
}));
connectToDB().then((MongoClient)=> {
    app.use("/api",api.default(MongoClient));
    app.listen(8000,() => {
        console.log("Authentification !");
    });
});