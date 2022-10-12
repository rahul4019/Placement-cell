module.exports.dashboard = (req, res) => {
    return res.render('dashboard', {
        title: 'Dashboard'
    })
}