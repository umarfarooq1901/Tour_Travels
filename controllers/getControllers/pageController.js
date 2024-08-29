// Home route

const getHomeHandler = (req,res)=>{
    res.render('index', {heading: 'This is the home page!', subheading: "We are the best organization "})
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


module.exports = {getHomeHandler, getContactHandler, getAboutHandler, getSignupHandler, getLoginHandler}