const express = require("express");
const path = require("path");
const xhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // Importing cookie-parser middleware
const connectDb = require("./utils/connectDb");
const userAuth = require("./Authorization/userAuth"); // Importing the userAuth middleware
const adminAuth = require("./Authorization/adminAuth"); // Importing the adminAuth middleware
const {
  getContactHandler,
  getAboutHandler,
  getHomeHandler,
  getSignupHandler,
  getLoginHandler,
  getServicesHandler,
  getPackagesHandler,
} = require("./controllers/getControllers/pageController");
const {
  handleUserSignup,
  handleUserLogin,
  handleUserDelete,
  handleUserLogout,
} = require("./controllers/postCoontrollers/userController");
const {
  getAdminDashboard,
  adminLogout,
  getUsersDetails,
} = require("./controllers/getControllers/adminController");
const multimid = require("./middleware/multer");
const {
  handleCreateTour,
  handleDeleteTour,
  handleEditTour,
  getAllTours,
  getTour,
} = require("./controllers/postCoontrollers/tourController");

const port = 4000;
const app = express();

// Database connection
connectDb();

// Middlewares
app.use(express.static(path.join(__dirname, "Public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Adding cookie-parser middleware

// Render engine setting
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views", "Pages"));

app.engine(
  "hbs",
  xhbs.engine({
    extname: "hbs", // engine
    defaultLayout: "layout", // layout is the main page
    layoutsDir: path.join(__dirname, "views", "Layout"),
    partialsDir: path.join(__dirname, "views", "Partials"),
  })
);

// Routes
app.get("/", getHomeHandler);
app.get("/about", getAboutHandler);
app.get("/contact", getContactHandler);
app.get("/services", getServicesHandler);
app.get("/packages", getPackagesHandler);

// Admin Routes
app.get("/admin/dashboard", adminAuth, getAdminDashboard);
app.post("/admin/logout", adminLogout);
app.get('/admin/dashboard/users', adminAuth, getUsersDetails);


// User Routes
app.get("/user/login", getLoginHandler); // page view
app.post("/user/login", handleUserLogin); // request execute
app.get("/user/signup", getSignupHandler);
app.post("/user/signup", handleUserSignup);
// Protect the user deletion route with userAuth middleware
app.delete("/user/delete/:_id", adminAuth, handleUserDelete);
app.post("/user/logout", handleUserLogout); // route for userlogout

// routes for Tours
app.post("/tour/createTour", adminAuth, multimid, handleCreateTour);
app.get("/tour/getAllTour", adminAuth, getAllTours);
app.get("/tour/getTour/:_id", adminAuth, getTour);
app.put("/tour/editTour/:_id", adminAuth, handleEditTour);
app.delete("/tour/deleteTour/:_id", adminAuth, handleDeleteTour);



// Last route (Listening on port)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
