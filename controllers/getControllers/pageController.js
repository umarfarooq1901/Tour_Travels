// Home route

const getHomeHandler = (req,res)=>{
    res.render('index', {heading: 'Enjoy Your Vacation With Us', subheading: "Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum lorem sit"})
}

// Servies page route

const getServicesHandler = (req, res)=>{
    res.render('Services', {heading: "Services Page", subheading: "Feel free to reach out for inquiries, support, or just to say hello. We're here to help!"})
}

// contact route
const getContactHandler = (req,res) =>{


res.render("Contact" , {heading: 'Get in Touch with Us', subheading: "Feel free to reach out for inquiries, support, or just to say hello. We're here to help!"})


}

// about route

const getAboutHandler = (req, res)=>{
    res.render('About', {heading: "This is the About section", subheading: "We are here for you!"})
}


// signup page

const getSignupHandler = (req,res)=>{
    res.render('Signup')
}


// Login page

const getLoginHandler = (req,res)=>{
        res.render('Login')
}


module.exports = {getHomeHandler, getContactHandler, getAboutHandler, getSignupHandler, getLoginHandler, getServicesHandler}