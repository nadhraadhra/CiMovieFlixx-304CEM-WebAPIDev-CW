//Importing Modules

const path = require("path");
const cors = require('cors')
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./server/config/key");

// const mongoose = require("mongoose");
// mongoose
//   .connect(config.mongoURI, { useNewUrlParser: true })
//   .then(() => console.log("DB connected"))
//   .catch(err => console.error(err));

//Connect to the MongoDB
mongoose.connect(config.mongoURI,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('Successfully Connected to MongoDB now.......'))
  .catch(err => console.log(err));

app.use(cors())

//to not get any deprecation warning or error
app.use(bodyParser.urlencoded({ extended: true }));

//CONFIGURATION // Body Parser and Cookie Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

//Importing Routes both API and View to handle request
app.use('/api/users', require('./server/routes/users'));
app.use('/api/favorite', require('./server/routes/favorite'));

app.use('/uploads', express.static('uploads'));

// Serve static assets if in production and check if app in Heroku
if (process.env.NODE_ENV === "production") {
  // All the javascript and css files will be read and served from this folder
  app.use(express.static('client/build'));

  // Save in index.html for all page routes    html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`)
});