const db = require('../models')
exports.signUp = (req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    db.User.create({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password
    })
    .then(success=>{
        res.send("Created")
    })
    .catch(err=>{
        next(err)
    })
}