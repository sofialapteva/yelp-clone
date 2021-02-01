// modules//
const express = require('express');
const session = require('express-session');
require('dotenv').config();
const cors = require('cors')
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
// mongoose
const uri = process.env.URI || 'mongodb://localhost:27017/hlebhelb';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
const { User, Restaurant } = require('./models')

// server
const app = express();
// middlewares//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new MongoStore({
      mongooseConnection: mongoose.createConnection(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET || 's2dnkl86ftsss5k4Nvk2s',
    cookie: { secure: false },
  }),
);

app.use(cors())

app.use((req, res, next) => {
  res.locals.login = req.session?.login;
  next();
});


app.post('/login', async (req, res) => {
  let newUser = new User({ login, password } = req.body);
  await newUser.save();
  req.session.login = newUser.login;
  console.log(newUser)
  res.status(200).json({ 'login': newUser.login });
});


app.get('/restaurant', async (req, res) => {
  const restaurants = await Restaurant.find()
  res.status(200).json(restaurants);
});

app.post('/restaurant', async (req, res) => {
  let restaurant = await Restaurant.find({ name: req.body.name })
  if (restaurant) {
    await Restaurant.updateOne({ name: req.body.name }, { name, cuisine, location, rating, reviews, check } = req.body)
  } else {
    restaurant = new Restaurant({ name, cuisine, location, rating, reviews, check } = req.body);
    await restaurant.save();
  }
  res.status(200).json('ok');
});


app.post('/review', async (req, res) => {
  await Restaurant.updateOne({ name: req.body.restaurant }, { $push: { reviews: req.body.review } });
  res.status(200).json('ok');
});

const port = process.env.PORT || 3001;
app.listen(port);
