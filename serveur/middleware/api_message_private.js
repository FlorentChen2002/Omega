const express = require("express");
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
          // 1) Get current user (pour React)
  router.get('/current-user', (req, res) => {
      console.log('Session:', req.session);
      if (!req.session || !req.session.userid) {
        return res.status(401).json({ message: 'Non authentifié' });
      }
      res.json({ userId: req.session.userid });
    });
  
  // 2) GET all conversations for current user
  router.get("/conversations", async (req, res) => {
    try {
      const userId = req.session.userid;
      if (!userId) return res.status(401).json({ message: "Non authentifié" });
  
      const conversations = await db.collection("Conversation")
        .find({ participants: userId })
        .toArray();
  
      // Récupérer tous les participants uniques pour afficher leurs pseudos
      const allUserIds = [...new Set(conversations.flatMap(conv => conv.participants))];
  
      // Convertir en ObjectId
      const userObjectIds = allUserIds.filter(id => ObjectId.isValid(id)).map(id => new ObjectId(id));
  
      const users = await db.collection("LoginDB").find({
        _id: { $in: userObjectIds }
      }).toArray();
  
      const idToPseudo = Object.fromEntries(users.map(user => [user._id.toString(), user.pseudo]));
  
      // Pour chaque conversation, afficher le pseudo de l'autre participant
      const formatted = conversations.map(conv => {
        const otherId = conv.participants.find(id => id !== userId);
        return {
          _id: conv._id,
          otherPseudo: idToPseudo[otherId] || "Inconnu"
        };
      });
  
      res.json(formatted);
  
    } catch (err) {
      console.error("Erreur get conversations:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  
  // 3) POST create new conversation
  router.post("/conversations", async (req, res) => {
    try {
      const currentUserId = req.session.userid;
      const { pseudo } = req.body;
  
      if (!currentUserId || !pseudo) {
        return res.status(400).json({ message: "Requête invalide" });
      }
  
      const targetUser = await db.collection("LoginDB").findOne({ pseudo });
      if (!targetUser) {
        return res.status(404).json({ message: "Utilisateur introuvable" });
      }
  
      if (targetUser._id.toString() === currentUserId) {
        return res.status(400).json({ message: "Impossible de créer une discussion avec soi-même" });
      }
  
      // Vérifie si conversation existe (participants au format string)
      const existing = await db.collection("Conversation").findOne({
        participants: { $all: [currentUserId, targetUser._id.toString()] }
      });
  
      if (existing) {
        return res.status(200).json(existing); // déjà existante
      }
  
      const newConv = {
        participants: [currentUserId, targetUser._id.toString()],
        messages: []
      };
  
      const result = await db.collection("Conversation").insertOne(newConv);
      res.status(201).json({ ...newConv, _id: result.insertedId });
    } catch (err) {
      console.error("Erreur création conversation:", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
  
  // 4) GET messages of a conversation
  router.get("/conversations/:conversationId/messages", async (req, res) => {
    try {
      const { conversationId } = req.params;
      if (!ObjectId.isValid(conversationId)) {
        return res.status(400).json({ message: "ID de conversation invalide" });
      }
  
      const conversation = await db.collection("Conversation").findOne({ _id: new ObjectId(conversationId) });
      if (!conversation) return res.status(404).json({ message: "Conversation non trouvée" });
  
      // Attention : messages est un tableau d'ids stockés en string ou ObjectId ? Ici on suppose string
      const messageIds = conversation.messages.map(id => ObjectId.isValid(id) ? new ObjectId(id) : id);
  
      const messages = await db.collection("Message").find({
        _id: { $in: messageIds }
      }).toArray();
  
      res.json(messages);
    } catch (err) {
      console.error("Erreur récupération messages:", err);
      res.status(500).json({ error: "Erreur serveur" });
    }
  });
  
  // 5) POST add a message to a conversation
  router.post('/:conversationId', async (req, res) => {
    try {
      const sender = req.session.userid;
      const { conversationId } = req.params;
      const { content } = req.body;
  
      if (!sender) return res.status(401).json({ message: "Non authentifié" });
      if (!ObjectId.isValid(conversationId)) return res.status(400).json({ message: "ID de conversation invalide" });
      if (!content || !content.trim()) return res.status(400).json({ message: "Contenu du message manquant" });
  
      const newMessage = {
        sender: new ObjectId(sender),
        content,
      };
  
      const result = await db.collection("Message").insertOne(newMessage);
  
      await db.collection("Conversation").updateOne(
        { _id: new ObjectId(conversationId) },
        { $push: { messages: result.insertedId } }
      );
  
      res.status(201).json({ success: true, message: "Message envoyé", messageId: result.insertedId });
    } catch (err) {
      console.error("❌ Erreur POST message :", err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  });
    return router;
}
exports.default = init;