const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const app = express();
const Campground = require('./modules/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/makeCampground', async (req, res) => {
    const camp = new Campground({
      title:'My Backyard',
      price:'0.00',
      description:'cheap camping',
      location:'My Backyard'
    })
   await camp.save();
   res.send(camp)
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

