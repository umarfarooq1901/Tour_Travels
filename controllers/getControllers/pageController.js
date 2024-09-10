// Home route

const getHomeHandler = (req, res) => {
  const token = req.cookies["token"];
  const isLogged = !!token; //returns true if the token is present else returns false
  res.render("index", {
    isLogged,
    heading: "Enjoy Your Vacation With Us",
    subheading: "Creating Memorable Journeys, One Trip at a Time",
  });
};

// Servies page route

const getServicesHandler = (req, res) => {
  const token = req.cookies['token'];
  const isLogged = !!token;
  res.render('Services', {
    isLogged,
    heading: "Our Services",
    subheading: "Comprehensive Travel Solutions Tailored to You",
  });

};

// contact route
const getContactHandler = (req, res) => {
  const token = req.cookies['token'];
  const isLogged = !!token;
  res.render('Contact',{
    isLogged,
    heading: "Get in Touch with Us",
    subheading:"Feel free to reach out. We’re Here to Help Plan Your Next Adventure",

  });

};
// packages route

const getPackagesHandler = (req, res) => {
  const token = req.cookies['token'];
  const isLogged = !!token;
  res.render("Packages", {
    isLogged,
    heading: "Travel Packages",
    subheading: "Explore Our Curated Experiences for Every Traveler",
  });
};

// about route

const getAboutHandler = (req, res) => {
  const token = req.cookies['token'];
  const isLogged = !!token;
  res.render("About", {
    isLogged,
    heading: "Passion for Travel, Excellence in Service",
    subheading: "Passion for Travel, Excellence in Service",
  });
};

// signup page

const getSignupHandler = (req, res) => {
  res.render("Signup");
};

// Login page

const getLoginHandler = (req, res) => {
  res.render("Login");
};


// Admin pages

// UsersPage



module.exports = {
  getHomeHandler,
  getContactHandler,
  getAboutHandler,
  getSignupHandler,
  getLoginHandler,
  getServicesHandler,
  getPackagesHandler,
};
