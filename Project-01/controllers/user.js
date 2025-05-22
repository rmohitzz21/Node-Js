const User = require('../models/user');

async function handleGetAllUsers(req,res) {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}


async function getUserById(req,res){
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error: "User Not Found"});
    return res.json(user);
}

async function handleUpdateUser(req,res) {
    await User.findByIdAndUpdate(req.params.id , {lastName: "Changed"});
    return res.json({status : "Success"});

}

async function handleDeleteUser(req,res) {
    await User.findByIdAndDelete(req.params.id)
    return res.json({status : "Success"});

}

async function handleCreateNewUser(req,res) {
     const body = req.body;

  if(!body || 
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.job_title
  ){
    return res.status(400).json({msg : 'These Field Are Required '});
  }

   const result =  await User.create({

        firstName : body.first_name,
        lastName  : body.last_name,
        email : body.email,
        gender : body.gender,
        jobTitle : body.job_title,
    });
    console.log(result);
    return res.status(201).json({msg : 'Success', id : result._id});
}

module.exports = {handleGetAllUsers,getUserById,handleUpdateUser,handleDeleteUser,handleCreateNewUser};