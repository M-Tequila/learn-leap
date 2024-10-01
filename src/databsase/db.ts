import mongoose, { Mongoose } from "mongoose";

export default class DB {
  /**
   * connect
   */
  public async connect() {
    // const url = process.env.MONGO_URI;
    const url = "mongodb+srv://Collins01:1223334444@nodeexpressprojects.xkvg6tw.mongodb.net/03-TASK-MANAGER-APP?retryWrites=true&w=majority";
    return await mongoose.connect(url!, {}).catch((error) => {
      console.log(`Error Connecting to DB::: ${error}`);
    });
  }
}
