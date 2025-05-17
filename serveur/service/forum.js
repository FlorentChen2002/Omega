const { ObjectId } = require('mongodb');
class Forum{
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }
  createCategories(titre,description,date,userid,userpseudo){
    return new Promise(async(resolve, reject) => {
      const tmp = await this.db.collection("ForumDB").insertOne({
        titre: titre,
        description:description,
        date: date,
        user_id:userid,
        user_pseudo:userpseudo,
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
      console.log()
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
}
  exports.default = Forum;