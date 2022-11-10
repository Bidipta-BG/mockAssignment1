let jwt = require("jsonwebtoken")

function auth(req,res,next){
    let token = req.headers["Authorization"]
    if (!token) token = req.headers[`authorization`]
    if(!token) return res.status(401).send({message: "Token must be present in the header"})
    token = token.split(" ")[1]
    // console.log(token)

    jwt.verify(token, "thisIsTheSecretKey", (error, decodedToken) => {
        // console.log(decodedToken);
        // console.log(error);
        if(error){
            let message = error.message == "jwt expired" ? "token expired" : 'token invalid' 
            return res.status(401).send({ status: false, message })
        }
        if (!decodedToken) return res.status(401).send({ status: false, message: "No authentication. Login is requird" })
        next()
    })

    // let decodedToken = jwt.verify(token, "thisIsTheSecretKey")
    // console.log(decodedToken)
    // if (!decodedToken) return res.status(401).send({ status: false, message: "No authentication. Login is requird" })
    
    // next()
}

module.exports = {auth}