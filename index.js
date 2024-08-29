const express = require('express');
const path = require('path');
const xhbs = require('express-handlebars');
const connectDb = require('./utils/connectDb');
const bodyParser = require('body-parser');
const { getContactHandler, getAboutHandler, getHomeHandler, getSignupHandler, getLoginHandler } = require('./controllers/getControllers/pageController');
const handleUserSignup = require('./controllers/postCoontrollers/userController');
const port = 4000;
const app = express();

// Middlewares

app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());
connectDb();


// Eender engine setting
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
app.get('/user/signup', getSignupHandler);
app.get('/user/login', getLoginHandler);

// post routes
app.post('/user/signup', handleUserSignup );
// app.post('/login', );

// Last route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});











// app.listen(8000, ()=>{
//   console.log(`server is running`);
  
// })




















// const os = require('os');
// console.log(os.cpus().length);


// const fs = require('fs');
// fs.writeFile('hello.txt', "hello world", (error)=>{
   
    
// });

// fs.readFile('hello.txt', 'utf-8', (error, read)=>{
//     if(error){
//       console.log(error);
      
//     }
//     else{
//       console.log(read);
      
//     }
// })


// creating http server in node & log of the users whom request the server
// const http = require("http");
// const fs = require('fs');

// const Server = http.createServer((req, res)=>{
//   res.end('hi from the server')
// })



// const server = http.createServer((req, res)=>{
//   if(req.url === ' /favicon.ico') return res.end()
//   const log = `${Date.now()}: ${req.url} New Request Recieved\n`
//     fs.appendFile("log.txt", log, (err, data)=>{
//       switch(req.url){
//         case '/' : res.end('Home Page!');
//             break;

//             case '/about': res.end('About Page');
//               break;

//                   default: res.end('No Page 404')
//       }
//     })
// })