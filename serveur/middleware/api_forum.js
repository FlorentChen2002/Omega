const express = require("express");
const Forum = require("../service/forum.js");

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
    const forum = new Forum.default(db);
    router.get("/sujet", async (req, res) =>{//obtenir toutes les sujets
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        try{
            const tmp = await forum.getAllSujet();
            console.log(tmp);
            if (tmp===null){
                res.status(404).json({
                    status: 404,
                    message: "Sujet inexistant"
                });
            }
            else{
                res.status(200).send(tmp);
            }

        }catch(e){
            res.status(500).send(e);
        }
    });
    router.get("/allthread", async (req, res) =>{//obtenir toutes les threads
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        try{
            const tmp = await forum.getAllThread();
            if (tmp===null){
                res.status(404).json({
                    status: 404,
                    message: "Aucun thread"
                });
            }
            else{
                res.status(200).send(tmp);
            }

        }catch(e){
            res.status(500).send(e);
        }
    });
    router.get("/thread", async (req, res) =>{//obtenir un thread specifique
        console.log(req.session.userid);
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        try{
            const sujetid = req.query.sujetid;
            const tmp = await forum.getThread(sujetid);
            console.log(tmp);
            if (tmp===null){
                res.status(404).json({
                    status: 404,
                    message: "Thread inexistant"
                });
            }
            else{
                res.status(200).send(tmp);
            }

        }catch(e){
            res.status(500).send(e);
        }
    });
    router.post("/postforum", async (req, res) =>{//creation d un sujet
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        try{
            const {titre,description,date,userid,userpseudo,private} = req.body;
            if( titre && description && date && userid && userpseudo ){
                const tmp = await forum.createCategories(titre,description,date,userid,userpseudo,private);
                if(tmp){
                    res.status(201).json({
                    status: 201,
                    message: "Créaction d'un sujet"
                    });
                }else{
                    res.status(401).json({
                    status: 401,
                    message: "Erreur de créaction"
                    });
                }
            } else {
                res.status(404).json({
                    status: 404,
                    message: "Manque des données"
                });
            }
        }catch (e) {
            console.error("Erreur dans /user/postforum :", e);
            res.status(500).json({ error: e.message });
        }
    });
    router.post("/post", async (req, res) =>{//creation d un thread
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        try{
            const {sujetid,content,userid,userpseudo,date,prive,repond} = req.body;
            if(sujetid && content && userid && userpseudo && date){
                const tmp = await forum.createThreads(sujetid,content,userid,userpseudo,date,prive,repond);
                if(tmp){
                    res.status(201).json({
                    status: 201,
                    message: "Créaction d'un thread"
                    });
                }else{
                    res.status(404).json({
                    status: 404,
                    message: "Erreur de créaction"
                    });
                }
            } else {
                res.status(400).json({
                    status: 400,
                    message: "Manque des données"
                });
            }
        }catch (e) {
            console.error("Erreur dans /user/postforum :", e);
            res.status(500).json({ error: e.message });
        }
    });
    router.delete("/delete/sujet", async (req, res) =>{// supprimer un sujet + les commentaires qui va avec
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        const { id } = req.body;
        console.log(id);
        if (!id) {
            res.status(400).json({ status: 400, message: "ID du sujet manquant" });
        }
        try {
            const deleted = await forum.deleteSujet(id);
            if (!deleted) {
                res.status(404).json({ status: 404, message: "Sujet non trouvé" });
            }

            res.status(200).json({ status: 200, message: "Sujet supprimé" });
        } catch (err) {
            res.status(500).json({error: err.message });
        }
    });
    router.delete("/delete/thread", async (req, res) =>{// supprimer un commentaire/thread
        if (!req.session.userid) return res.status(401).json({ error: "L'utilisateur n'est pas connecté" });
        const { id } = req.body;
        if (!id) {
            res.status(400).json({ status: 400, message: "ID du sujet manquant" });
        }
        try {
            const deleted = await forum.deleteThread(id);
            if (!deleted) {
                res.status(404).json({ status: 404, message: "thread non trouvé" });
            }

            res.status(200).json({ status: 200, message: "thread supprimé" });
        } catch (err) {
            res.status(500).json({error: err.message });
        }
    });
    return router;
}
exports.default = init;