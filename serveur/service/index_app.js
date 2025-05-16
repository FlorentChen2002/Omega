/**
 * =========================================================================================================================
 * Serveur Express de base avec gestion CORS et routes simples
 * =========================================================================================================================
 */

const express = require('express'); // Importe le framework Express.js
const cors = require('cors'); // <----- IMPORTANT : Importe le module pour gérer les politiques CORS

// NOTE (Pour le TD8) - On ajoute :
// const { enregistrerMessage } = require('./db'); // <--- AJOUT TD8 : importe la fonction MongoDB depuis db.js

const app = express(); // Crée une instance de l'application Express
const port = 8000; // Définit le port d'écoute du serveur

/**
 * =====================================================================================================================
 * Middleware globaux
 * =====================================================================================================================
 */

// Middleware CORS : autorise toutes les origines pour les requêtes (utile en développement)
app.use(cors({ origin: '*' })); // <----- IMPORTANT : Autorise toutes les origines pour les requêtes cross-domain

// Middleware JSON : permet de parser automatiquement les corps de requêtes au format JSON
app.use(express.json()); // Transforme le JSON en objets JavaScript utilisables

/**
 * =====================================================================================================================
 * Route : GET /
 * Retourne un message simple pour vérifier que le serveur fonctionne
 *
 * @returns {200} Message texte simple
 * =====================================================================================================================
 */
app.get('/', (req, res) => {
  res.type('text/plain; charset=utf-8'); // Définit le type de contenu (texte brut en UTF-8)
  res.send('Message reçu'); // Envoie une réponse simple
});

/**
 * =====================================================================================================================
 * Route : POST /
 * Reçoit un message dans le champ "texte" du corps JSON
 *
 * @body {string} texte - Message à traiter
 *
 * @returns {200} Message bien reçu
 * @returns {400} Champ "texte" manquant
 * =====================================================================================================================
 */
app.post('/d', (req, res) => {
// NOTE (Pour le TD8) - On remplace "(req, res)" par "async (req, res)", pour l'utilisation de "await".

  const message = req.body.texte; // Extraction du champ "texte" du corps de la requête

  if (message) {
    // Message reçu correctement
    console.log(`[INFO] Requête POST reçue - Message : "${message}"`);
    res.status(200).send('Message bien reçu'); // Répond avec un succès

    /**
    * NOTE (Pour le TD8) - On remplace le "res.status(200).send('Message bien reçu');" par :
    * try {
    *   await enregistrerMessage(message); // <--- AJOUT TD8 : Enregistrement du message dans MongoDB
    *   return res.status(200).send('Message bien reçu et enregistré'); // <--- Réponse modifiée
    * } catch (err) {
    *   console.error('[ERREUR] Problème avec MongoDB :', err); // <--- AJOUT TD8 : log en cas d'erreur Mongo
    *   return res.status(500).send('Erreur serveur'); // <--- AJOUT TD8 : Réponse modifiée en cas d'erreur
    * }
    */

  } else {
    // Champ manquant dans la requête
    console.warn('[WARN] Requête POST reçue sans champ "texte"');
    res.status(400).send('Champ "texte" manquant'); // Répond avec une erreur 400
    // NOTE (Pour le TD8) - On rajoute "return" avant "res.status(400).send('Champ "texte" manquant');"
  }
});

/**
 * =====================================================================================================================
 * Lancement du serveur
 * =====================================================================================================================
 */
app.listen(port, () => {
  console.log(`[SERVEUR] En écoute sur le port ${port}`); // Affiche un message dans la console
});