const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const config = require("./config");
const app = express();

const PORT = 3030;
mongoose.connect(
  `mongodb://${config.username}:${config.password}@ds337718.mlab.com:37718/graphql-space`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);


const dbConnection = mongoose.connection;
dbConnection.on("error", err => console.log(`Connection error: ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));

app.listen(PORT, err => {
  err ? console.log(err) : console.log("Server started!");
});
