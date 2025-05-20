const express = require("express");
const Users = require("../service/users.js");
const { ObjectId } = require("mongodb");

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

    router.get("/rocher", async (req, res) => {
        try {
          console.log("👉 Accès route /admin/users");
      
          if (!req.session.userid) {
            console.log("⛔ Non authentifié");
            return res.status(401).json({ status: 401, message: "Non authentifié" });
          }
      
          const result = await users.get(req.session.userid);
          const user = Array.isArray(result) ? result[0] : result;
      
          console.log("👤 Utilisateur trouvé :", user);
          console.log("Vérification du rang :", user.rang);
      
          if (!user || user.rang !== "admin") {
            return res.status(403).json({ message: "Accès refusé" });
          }
      
          const allUsers = await users.getAllUser();
          const filteredUsers = allUsers.filter(u => u.pseudo !== user.pseudo);
          console.log("✅ Liste des utilisateurs (filtrée) :", filteredUsers.length);
          res.json(filteredUsers);
      
        } catch (err) {
          console.error("🔥 ERREUR dans /admin/users :", err);
          res.status(500).json({ error: "Erreur serveur interne" });
        }
      });
      

      router.post("/promote/:id", async (req, res) => {
        try {
          const user = await db.collection('LoginDB').findOne({ _id: new ObjectId(req.params.id) });
      
          if (!user) {
            return res.status(404).json({ error: "Utilisateur introuvable." });
          }
      
          if (!user.status) {
            return res.status(403).json({ error: "Utilisateur non validé. Impossible de promouvoir admin." });
          }
      
          await db.collection('LoginDB').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { rang: "admin" } }
          );
      
          res.json({ message: "Utilisateur promu admin." });
      
        } catch (e) {
          console.error("Erreur promotion admin :", e);
          res.status(500).json({ error: "Erreur lors de la promotion." });
        }
      });
      
      
      router.post("/demote/:id", async (req, res) => {
        try {
          await db.collection('LoginDB').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { rang: "user" } }
          );
          res.json({ message: "Rôle admin retiré." });
        } catch (e) {
          res.status(500).json({ error: "Erreur lors de la rétrogradation." });
        }
      });
      
      router.post("/validate/:id", async (req, res) => {
        try {
          await db.collection('LoginDB').updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { status: true } }
          );
          res.json({ message: "Inscription validée." });
        } catch (e) {
          res.status(500).json({ error: "Erreur validation inscription." });
        }
      });
      
      router.delete("/refuse/:id", async (req, res) => {
        try {
          await db.collection('LoginDB').deleteOne({ _id: new ObjectId(req.params.id) });
          res.json({ message: "Utilisateur supprimé." });
        } catch (e) {
          res.status(500).json({ error: "Erreur suppression utilisateur." });
        }
      });
        
      router.delete("/user/:pseudo", async (req, res) => {
        try {
          if (!req.session.userid) {
            return res.status(401).json({ message: "Non authentifié" });
          }
      
          const currentUserResult = await users.get(req.session.userid);
          const currentUser = Array.isArray(currentUserResult) ? currentUserResult[0] : currentUserResult;
      
          if (!currentUser || currentUser.rang !== "admin") {
            return res.status(403).json({ message: "Accès refusé" });
          }
      
          const pseudoToDelete = req.params.pseudo;
      
          // On cherche l'utilisateur à supprimer
          const userToDeleteResult = await users.collection.findOne({ pseudo: pseudoToDelete });
          if (!userToDeleteResult) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
          }
      
          // ❌ Empêche la suppression des admins
          if (userToDeleteResult.rang === "admin") {
            return res.status(403).json({ message: "Impossible de supprimer un admin" });
          }
      
          // ✅ Supprime les utilisateurs non-admin, qu'ils soient validés ou pas
          await users.collection.deleteOne({ pseudo: pseudoToDelete });
      
          res.status(200).json({ message: `Utilisateur ${pseudoToDelete} supprimé.` });
      
        } catch (err) {
          console.error("Erreur suppression utilisateur:", err);
          res.status(500).json({ message: "Erreur serveur interne" });
        }
      });

      router.get('/current-user', (req, res) => {
        console.log('Session:', req.session);
        if (!req.session || !req.session.userid) {
          return res.status(401).json({ message: 'Non authentifié' });
        }
        res.json({ userId: req.session.userid });
      });
    return router;
}
exports.default = init;
