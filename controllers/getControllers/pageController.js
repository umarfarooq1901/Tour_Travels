// Home route

const getHomeHandler = (req,res)=>{
    res.render('index', {heading: 'This is the home page!', subheading: "We are the best organization "})
}

// contact route
const getContactHandler = (req,res) =>{


res.render("contact" , {heading: 'Get in Touch with Us', subheading: "Feel free to reach out for inquiries, support, or just to say hello. We're here to help!"})


}

// about route

const getAboutHandler = (req, res)=>{
    res.render('about', {heading: "This is the About section", subheading: "We are here for you!"})
}


// signup page

const getSignupHandler = (req,res)=>{
    res.render('signup')
}


// Login page

const getLoginHandler = (req,res)=>{
        res.render('login')
}


module.exports = {getHomeHandler, getContactHandler, getAboutHandler, getSignupHandler, getLoginHandler}