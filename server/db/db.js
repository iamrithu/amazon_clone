const mongoose = require("mongoose");
const DB = "mongodb+srv://amazon_clone:admin123@cluster0.zmrikzi.mongodb.net/amazon-clone?retryWrites=true&w=majority";


module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(DB, connectionParams)
    .then(console.log("connected to database succesfully"))
    .catch((err) => {
      console.log("Error in  Db connection", err);
    });
};