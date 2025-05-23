## Projet web LU3IN017

**Binôme** : CHEN Florent (21101813),  Adam Chaara 21113891

**GitHub** : [Lien vers le projet web](https://github.com/FlorentChen2002/Omega)

**Vidéo** : [Lien vers la vidéo de démonstration du projet 1]

---
### Lancement du projet

Pour lancer le projet, il est nécessaire d’ouvrir trois terminaux distincts afin de démarrer la base de données, le serveur backend, et le client React.

1. Dans le premier terminal, on lance la base de donnée mongodb:
```bash
sudo systemctl start mongod
mongosh
```
2. Dans le deuxième terminal, on lance le serveur :
```bash
cd serveur/
npm start
```
3. Dans le troisième terminal, on lance le client :
```bash
cd /client/app
npm run dev
```
---

## Travail effectué par Florent CHEN

Le travail a été réalisé sur Windows en utilisant Ubuntu via WSL2.  
Je me suis également occupé de la structuration du projet ainsi que de l’implémentation et la modification des différents composants.


### Côté client (css inclu)

- Création des composants liés à l'authentification  
  (dossier : `/client/app/src/components/auth`)  

- Mise en place des composants pour la gestion du forum (ouvert et fermé), incluant :  
  - Mise en place d’un système permettant de créer des topics/sujets (avec la possibilité pour les admins de cacher certains topics aux utilisateurs),  
  - Possibilité de laisser des commentaires (threads) sur les topics/sujets,  
  - Possibilité de répondre aux commentaires laissés sur les topics/sujets,  
  - Suppression des topics et commentaires par leurs auteurs,  
  - Fonctionnalité permettant aux admins de supprimer les messages et topics de n’importe quel utilisateur,  
  - Accès au profil utilisateur en cliquant sur le pseudo dans les commentaires.  
  - Réception et affichage des commentaires et topics en temps réel.
  (dossiers : `/client/app/src/components/dashboard/forum` et `/client/app/src/components/dashboard/thread`)  

- Création des composants liés au profil utilisateur, avec :  
  - Possibilité de voir tous ses commentaires, mais les utilisateurs standards ne peuvent pas accéder aux commentaires privés,  
  - Un compteur de commentaires affiché sur le profil.  
  (dossier : `/client/app/src/components/dashboard/profile`)  

- Implémentation de la déconnexion, incluant :  
  - Destruction de la session utilisateur,  
  - Suppression des cookies associés.  
  (dossier : `/client/app/src/components/dashboard/deconnexion`)

### Côté serveur

- Mise en place du serveur avec Node.js avec Express.  
- Connexion à la base de données MongoDB.  
- Structuration claire et modulaire de l’architecture serveur. 
- Création des routes API pour la gestion des utilisateurs (en s’appuyant sur la correction des TME) et du forum.  
  (dossiers : `/serveur/middleware/api_user` et `/serveur/middleware/api_forum`)


###  Ce qui reste à faire

- Restructurer la partie client pour la rendre plus claire et mieux organisée.  
  Par exemple, dans la gestion des commentaires, un composant `postList` a été créé mais n'est pas réutilisé, car il est spécifiquement lié aux posts de type "commentaire". Une meilleure séparation des responsabilités serait souhaitable.

- Ajouter la possibilité d'envoyer un message privé en cliquant sur un bouton dans le profil d’un utilisateur.
- Signaler des personnes
- La fonctionnalité permettant d'ajouter des utilisateurs en tant qu'amis, prévue dans le document de mi-parcours.


#### Problèmes rencontrés

-J'ai rencontré des difficultés pour transmettre des données entre deux composants parents.  
Avec du recul, j'aurais pu contourner ce problème en passant une fonction en prop à un composant enfant, ce qui lui aurait permis de modifier le state de l’un des parents afin de transmettre les données à un autre enfant.

-J'ai eu du mal à faire une vidéo de moins de 12 minutes

---

## Travail effectué par  Adam Chaara


### Côté client (CSS inclus)

- Création d’un composant dédié aux conversations privées, offrant notamment la possibilité de :
  - d’envoyer des messages,  
  - de recevoir et afficher les messages en temps réel.
(dossiers : `/client/app/src/components/dashboard/message_private`)
- Création d'un composant pour le panneau d'administration (AdminPanel), permettant :  
  - possibilité de filtrer les utilisateurs,  
  - la suppression de comptes utilisateurs, 
  - la validation des inscriptions,  
  - la promotion ou la rétrogradation des utilisateurs.
(dossiers : `/client/app/src/components/dashboard/adminpage`)
- Création d’un composant de barre de recherche.
  - il permet d'effectuer des recherches selon l'argument saisi. 
(dossiers : `/client/app/src/components/dashboard/recherche`)


### Côté serveur

- Création des routes API pour la gestion des conversations privées (envoi, réception et affichage des messages).  
  (dossiers : `/serveur/middleware/api_message_private`)
- Mise en place de routes permettant de modifier l’état d’un utilisateur (validation, promotion, rétrogradation) ou de supprimer un compte.
(dossiers : `/serveur/middleware/api_admin`)

### Restait à faire

- Amélioration du CSS (notamment le fond d’écran, si possible).  
- Implémentation d’un système de relations d’amitié entre utilisateurs.  
- Mise en place d’une messagerie en temps réel via WebSocket.

### Difficultés rencontrées

- Difficulté à visualiser la messagerie privée.  
- Problèmes de synchronisation des requêtes pour la messagerie privée.  
- Complexité dans la mise en place de la disposition CSS du panneau d’administration (AdminPanel).  
- Difficulté à afficher correctement la liste des utilisateurs et les boutons associés lors du développement de l’AdminPanel.
