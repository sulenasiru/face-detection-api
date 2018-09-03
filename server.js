const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const signup = require('./controllers/signup');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Rahama3331',
    database : 'face-detection'
  }
});

db.select('*').from('users')


const app = express();

app.use(bodyParser.json());
app.use(cors())


app.get('/',(req, res) => {
	res.send(database.users);
})

app.post('/signin',(req,res) => {signin.handleSignin(req, res, db, bcrypt)})
// Dependency injection
app.post('/signup',(req,res) => {signup.handleSignup(req,res, db,bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfile(req,res, db)})

app.put('/image',(req, res)=> {image.handleImage(req,res, db)})
app.post('/imageUrl',(req, res)=> {image.handleApiCall(req,res)})

app.listen(3000, () => {
	console.log('app is running on port 3000');
})
