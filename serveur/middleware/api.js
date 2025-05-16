const express = require("express");
const Users = require("../service/users.js");
const cors = require('cors');

function init(db) {
    const router = express.Router();
    // On utilise JSON
    //router.use(cors({ origin: '*' }));
    router.use(express.json());
    // simple logger for this router's requests
    // all requests to this router will first hit this middleware
    router.use((req, res, next) => {
        console.log('API: method %s, path %s', req.method, req.path);
        console.log('Body', req.body);
        next();
    });
    const users = new Users.default(db);
    router.post("/user/login", async (req, res) => {
        try {
            const { login, password } = req.body;
            // Erreur sur la requête HTTP
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(!await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur inconnu"
                });
                return;
            }
            let userid = await users.checkpassword(login, password);
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Login et mot de passe accepté",
                            id: userid
                        });
                    }
                });
                return;
            }
            // Faux login : destruction de la session et erreur
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "login et/ou le mot de passe invalide(s)"
            });
            return;
        }
        catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });

    router.post("/user/register", async (req, res) =>{
        try{
            const { login, password, date, rang } = req.body;
            if (!login || !password) {
                res.status(400).json({
                    status: 400,
                    "message": "Requête invalide : login et password nécessaires"
                });
                return;
            }
            if(await users.exists(login)) {
                res.status(401).json({
                    status: 401,
                    message: "Utilisateur existant"
                });
                return;
            }
            let userid = await users.create(login, password,date,rang);//session je ne sais pas a quoi il sert
            if (userid) {
                // Avec middleware express-session
                req.session.regenerate(function (err) {
                    if (err) {
                        res.status(500).json({
                            status: 500,
                            message: "Erreur interne"
                        });
                    }
                    else {
                        // C'est bon, nouvelle session créée
                        req.session.userid = userid;
                        res.status(200).json({
                            status: 200,
                            message: "Créaction de compte accepté",
                            id: userid
                        });
                    }
                });
                return;
            }
            req.session.destroy((err) => { });
            res.status(403).json({
                status: 403,
                message: "Création de compte invalide"
            });
            return;
        }catch (e) {
            // Toute autre erreur
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        }
    });
    router.get("/user/me", async(req,res) =>{
        if(!req.session.userid){
            return res.status(401).json({
                status: 401,
                message: "Non authentifié"
            });
        }
        try{
            const user = await users.get(req.session.userid);
            console.log(user)
            if (!user){
                return res.status(404).json({
                    status: 404,
                    message: "utilisateur non trouvé"
                });
            }
            res.json(user);
        }catch(e){
            res.status(500).json({
                status: 500,
                message: "erreur interne",
                details: (e || "Erreur inconnue").toString()
            });
        };
    });
    router
        .route("/user/:user_id")
        .get(async (req, res) => {
        try {
            const user = await users.get(req.params.user_id);
            if (!user)
                res.sendStatus(404);
            else
                res.send(user);
        }
        catch (e) {
            res.status(500).send(e);
        }
    })
        .delete((req, res, next) => res.send(`delete user ${req.params.user_id}`));

    router.put("/user", (req, res) => {
        const { login, password, lastname, firstname } = req.body;
        if (!login || !password || !lastname || !firstname) {
            res.status(400).send("Missing fields");
        } else {
            users.create(login, password, lastname, firstname)
                .then((user_id) => res.status(201).send({ id: user_id }))
                .catch((err) => res.status(500).send(err));
        }
    });


    router.get("/user/forum", async (req, res) =>{
        try{
            const tmp = await users.getAllSujet();
            if (tmp===null){
                res.status(404).json({
                    status: 404,
                    message: "Sujet existant"
                });
            }
            else{
                res.send(tmp);
            }

        }catch(e){
            res.status(500).send(e);
        }
    });
    router.get("/user/forum/get", async (req, res) =>{
        try{
            const {sujetid} = req.body;
            const tmp = await users.getThread(sujetid);
            if (tmp===null){
                res.status(404).json({
                    status: 404,
                    message: "Thread existant"
                });
            }
            else{
                res.send(tmp);
            }

        }catch(e){
            res.status(500).send(e);
        }
    });
    return router;
}
exports.default = init;