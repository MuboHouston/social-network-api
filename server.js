const express = require('express')
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

//mongoose.connect tells Mongoose which db we want to connect to. if the environment variable exists use it, otherwise use the local MongoDB server's db. MongoDB will automatically connect to the db if it exists or create one if it doesn't.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social-network-api', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));