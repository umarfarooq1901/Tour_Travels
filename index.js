const express = require('express');
const path = require('path');
const xhbs = require('express-handlebars');
const connectDb = require('./utils/connectDb');
const { getContactHandler, getAboutHandler, getHomeHandler, getSignupHandler, getLoginHandler, getServicesHandler, getPackagesHandler } = require('./controllers/getControllers/pageController');
const bodyParser = require('body-parser');
const {handleUserSignup, handleUserLogin, handleUserDelete} = require('./controllers/postCoontrollers/userController');
const { adminLoginHandler } = require('./controllers/postCoontrollers/adminController');
const port = 4000;
const app = express();


// db connection call
connectDb();

// Middlewares

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());
// app.use(express.json());

app.use(express.urlencoded({ extended: true }));



// Render engine setting
app.set('view engine', 'hbs');
app.set("views" , path.join(__dirname , "views" , "Pages"))



app.engine("hbs" , xhbs.engine({
  extname: "hbs",     // engine
  defaultLayout: "layout",   // layout is the main page 
  layoutsDir: path.join(__dirname, "views", "Layout"),
  partialsDir: path.join(__dirname, "views" , "Partials"),
}))


// Routes

// app.get('/', (req, res) => {
//     res.send('hi');
//   });

// get routes for page rendering
app.get('/', getHomeHandler);
app.get('/about', getAboutHandler);
app.get('/contact', getContactHandler);
app.get('/services', getServicesHandler);
app.get('/packages', getPackagesHandler);


//admin Routes
app.get('/admin/dashboard', (req, res)=> res.render('AdminDashboard'));


app.get('/user/login', getLoginHandler);   // page view
app.post('/user/login', handleUserLogin );   // request execute 



app.get('/user/signup', getSignupHandler);
app.post('/user/signup', handleUserSignup );




app.post('/user/delete', handleUserDelete);


//  routes for admin






// Last route
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











