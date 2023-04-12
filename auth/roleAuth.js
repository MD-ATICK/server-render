require('dotenv').config()

exports.authorizeRoles = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(422).send({ error: `Role : ${req.user.role} is not allowd in this website` })
        }
        next()
    }
}