const express = require("express")
const router = express.Router()
const teacherModel = require("./teacherModel")
const studentModel = require("./studentModel")
const jwt = require("jsonwebtoken")
let auth = require("./auth")




router.post("/createteacher", async function(req, res){

    let body = req.body
    let data = await teacherModel.create(body)
    return res.status(201).send({data: data, status: true, message: "registerd successfully"})
})


router.post("/login", async function(req,res){

    let body = req.body
    let user = await teacherModel.findOne(body)
    if (!user) return res.status(401).send({status: false, message: "Invalid Credential"})

    const token = jwt.sign(
        {
            userId: user._id.toString(),
            project: "Assignment1"
        },
        "thisIsTheSecretKey"
    )
    res.setHeader('Authorization', token)
    return res.status(200).send({message: "Login Successfull", token: token})
})


router.get("/studentdata",auth.auth, async function(req, res){

    let data = await studentModel.find()
    if(data.length == 0) return res.status(400).send({status: false, message: "No data found"})
    return res.send({status:true, message: "Data fetched Successsfull", data: data})
})


router.post("/createstudentdata", auth.auth, async function (req, res) {

    let body = req.body
    // console.log(body);
    let nameCheck = await studentModel.findOne({$and:[{name:body.name, subject:body.subject}]})
    if(nameCheck){
        let updatedData = await studentModel.findByIdAndUpdate({_id: nameCheck._id}, {marks: body.marks}, {new: true})
        return res.status(200).send({ status: true, message: "marks update successfull", data: updatedData })
    }
    let data = await studentModel.create(body)
    return res.status(201).send({ status: true, message: "new record created successfull",  data: data })
})

module.exports = router