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
  res.render("Services", {
    heading: "Our Services",
    subheading: "Comprehensive Travel Solutions Tailored to You",
  });
};

// contact route
const getContactHandler = (req, res) => {
  res.render("Contact", {
    heading: "Get in Touch with Us",
    subheading:
      "Feel free to reach out. We’re Here to Help Plan Your Next Adventure",
  });
};
// packages route

const getPackagesHandler = (req, res) => {
  res.render("Packages", {
    heading: "Travel Packages",
    subheading: "Explore Our Curated Experiences for Every Traveler",
  });
};

// about route

const getAboutHandler = (req, res) => {
  res.render("About", {
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

module.exports = {
  getHomeHandler,
  getContactHandler,
  getAboutHandler,
  getSignupHandler,
  getLoginHandler,
  getServicesHandler,
  getPackagesHandler,
};
