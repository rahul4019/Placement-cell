// render the Sign In page
module.exports.signIn = (req, res) => {
    return res.render('user_sign_in', {
        title: "Placement cell | Sign Up",
    })
}

// render the Sign Up page
module.exports.signUp = (req, res) => {
    return res.render('user_sign_up', {
        title: "Placement cell | Sign Up",
    })
}

