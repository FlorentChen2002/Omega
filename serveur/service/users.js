const { ObjectId } = require('mongodb');
class Users {
    constructor(db) {
      this.db = db
      // suite plus tard avec la BD
    }
  
    create(login, password, date, rang) {
      return new Promise(async(resolve, reject) => {
        const tmp = await this.db.collection("LoginDB").insertOne({
          pseudo: login,
          mdp: password,
          date: date,
          rang: rang,
          online: false,
          status: false
        });
        if(tmp.acknowledged) {
          resolve(tmp.insertedId);
        } else {
          reject();
        }
      });
    }
  
    get(userid) {
      return new Promise(async(resolve, reject) => {
        if (!ObjectId.isValid(userid)) {
          return reject(new Error("Invalid userid format"));
        }
        const new_userid = new ObjectId(userid);
        const user = await this.db.collection('LoginDB').findOne({_id: new_userid});
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    }
  
    exists(login) {
      return new Promise(async(resolve, reject) => {
        const count = await this.db.collection('LoginDB').find({pseudo:login}).toArray();
        //console.log(count);
        if(count.length === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  
    checkpassword(login, password) {

        return new Promise(async(resolve, reject) => {
          //on ne peut pas avoir plusieurs users qui ont le meme pseudo
            const count = await this.db.collection('LoginDB').find({pseudo:login}).toArray();
            console.log(count[0]);
            if(count[0].mdp !== password) {
              //erreur
              reject();
            } else {
              
              resolve(count[0]._id);
            }
          });
    }
    deleteUser(userid){
      return new Promise(async(resolve, reject) => {
        try {
          const newUserid= new ObjectId(userid) ;
          const result = await this.db.collection('LoginDB').deleteOne({ _id:newUserid});
          if (result.deletedCount === 0) {
            return resolve(false);
          }
          resolve(true);//supprimer avec succes
        } catch (err) {
          reject(false);
        }
      });
    }
  
  }
  
  exports.default = Users;