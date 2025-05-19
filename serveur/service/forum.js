const { ObjectId } = require('mongodb');
class Forum{
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }
  createCategories(titre,description,date,userid,userpseudo,prive){
    return new Promise(async(resolve, reject) => {
      const tmp = await this.db.collection("ForumDB").insertOne({
        titre: titre,
        description:description,
        date: date,
        user_id:userid,
        user_pseudo:userpseudo,
        prive:prive,
      });
      //const tmp2 = await this.db.collection("ForumDB").find({}).toArray();
      //console.log(tmp2);
      if(tmp.acknowledged) {
        resolve(tmp.insertedId);
      } else {
        reject();
      }
    });
  }
  createThreads(sujetid,content,userid,userpseudo,date,repond){
    return new Promise(async(resolve, reject) => {
      const tmp = await this.db.collection("ThreadDB").insertOne({

        sujet_id:sujetid,
        content: content,
        user_id:userid,
        user_pseudo:userpseudo,
        date: date,
        repond:repond
      });
      if(tmp.acknowledged) {
        resolve(tmp.insertedId);
      } else {
        reject();
      }
    });
  }
  async getAllSujet(){
    return await this.db.collection('ForumDB').find({}).toArray();
  }
  async getThread(sujetid){
    return await this.db.collection('ThreadDB').find({sujet_id:sujetid}).toArray();
  }
  async getAllThread(){
    return await this.db.collection('ThreadDB').find({}).toArray();
  }
  deleteSujet(sujetid){
    return new Promise(async(resolve, reject) => {
      try {
        const newSujetid= new ObjectId(sujetid) ;
        const result = await this.db.collection('ForumDB').deleteOne({ _id:newSujetid});
        if (result.deletedCount === 0) {
          return resolve(false);
        }
        const recherche = await this.db.collection('ThreadDB').find({sujet_id:sujetid}).toArray();
        if(recherche.length===0){
          resolve(true);
        } else {
          const result2 = await this.db.collection('ThreadDB').deleteMany({sujet_id:sujetid});
          if (result2.deletedCount === 0) {
            return resolve(false);
          }
          resolve(true);//supprimer avec succes
        }
      } catch (err) {
        reject(false);
    }
    });
  }
  deleteThread(threadid){
    return new Promise(async(resolve, reject) => {
      try {
        const newThreadid= new ObjectId(threadid) ;
        //const tmp =await this.db.collection('ThreadDB').find({_id:newThreadid}).toArray();
        //console.log(tmp);
        const result = await this.db.collection('ThreadDB').deleteOne({ _id:newThreadid});
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
  exports.default = Forum;