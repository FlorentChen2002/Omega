const { ObjectId } = require('mongodb');
class Forum{
  constructor(db) {
    this.db = db
    // suite plus tard avec la BD
  }
  createCategories(titre,date,userid,userpseudo){
    return new Promise(async(resolve, reject) => {
      console.log()
      const tmp = await this.db.collection("ForumDB").insertOne({
        titre: titre,
        date: date,
        user_id:userid,
        user_pseudo:userpseudo
      });
      if(tmp.acknowledged) {
        resolve(tmp.insertedId);
      } else {
        reject();
      }
    });
  }

  createThreads(sujetid,content,userid,userpseudo,date){
    return new Promise(async(resolve, reject) => {
      console.log()
      const tmp = await this.db.collection("ThreadDB").insertOne({

        sujet_id:sujetid,
        content: content,
        user_id:userid,
        user_pseudo:userpseudo,
        date: date,
        list_content:[]
      });
      if(tmp.acknowledged) {
        resolve(tmp.insertedId);
      } else {
        reject();
      }
    });
  }

  createPosts(threadsid,userid,content,date){
    return new Promise(async(resolve, reject) => {
      console.log()
      const tmp = await this.db.collection("PostDB").insertOne({
        threads_id:threadsid,
        user_id:userid,
        content: content,
        date: date
      });
      if(tmp.acknowledged) {
        resolve(tmp.insertedId);
      } else {
        reject();
      }
    });
  }
  getAllSujet(){
    return new Promise(async(resolve, reject) => {
      const count = await this.db.collection('ForumDB').find({}).toArray();
        resolve(count);
    });
  }
  getThread(sujetid){
    return new Promise(async(resolve, reject) => {
      const new_sujetid = new ObjectId(sujetid)
      const count = await this.db.collection('PostDB').find({sujet_id:new_sujetid}).toArray();
        resolve(count);
    });
  }
}