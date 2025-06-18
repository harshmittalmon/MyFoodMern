const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://harshmittalmon:BPRPCH%40123@cluster0.trsfpbn.mongodb.net/MyFoodMern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("food_category").find({}).toArray();

    global.food_items = fetched_data;
    global.food_category = foodCategory;

    // console.log("Data fetched and stored in globals.");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = mongoDB;
