const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const mongoDB = require("./db");
const cors = require("cors");

const allowedOrigins = [
  'http://localhost:3000', 
  'https://foodzania-mern.vercel.app', 
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });



mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
