var Userdb = require('../model/model');
var nodemailer = require('nodemailer');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        password : req.body.password,
        totalRewardPoints : 0,
        quiz : 
        [
            { 
                topic : "Algebra", questionBank :
                [
                    {question : "What is your name?", choices : ["Manav", "Rohan", "Raman", "Kabir"], hints : "Starts with M letter", correctChoice : "Manav", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " },
                    {question : "What is your real brother's name?", choices : ["Manav", "Rohan", "Raman", "Kabir"], hints : "Starts with Ro letter", correctChoice : "Rohan", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " }
                ] 
            },
            { 
                topic : "Probability", questionBank :
                [
                    {question : "What is your age?", choices : ["25", "26", "27", "28"], hints : "Greater then 27", correctChoice : "28", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " },
                    {question : "What is your real brother's age?", choices : ["23", "24", "22", "25"], hints : "Approaching 24", correctChoice : "23", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " }
                ]
            },
            { 
                topic : "Statistics", questionBank :
                [
                    {question : "What is your age?", choices : ["25", "26", "27", "28"], hints : "Greater then 27", correctChoice : "28", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " },
                    {question : "What is your real brother's age?", choices : ["23", "24", "22", "25"], hints : "Approaching 24", correctChoice : "23", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " }
                ]
            },
            { 
                topic : "Number", questionBank :
                [
                    {question : "What is your name?", choices : ["Manav", "Rohan", "Raman", "Kabir"], hints : "Starts with M letter", correctChoice : "Manav", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " },
                    {question : "What is your real brother's name?", choices : ["Manav", "Rohan", "Raman", "Kabir"], hints : "Starts with Ro letter", correctChoice : "Rohan", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : " " }
                ] 
            }
        ]
    })

    // save user in the database
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect('/');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// checking credentials and retrieving data based on email and password inputs
exports.login = (req, res)=>{

    if(req.query.email && req.query.password){
        const id1 = req.query.email;
        const id2 = req.query.password;

        Userdb.find({email: id1, password: id2})
            .then(data =>{
                if(data.length==0){
                    res.status(404).send({ message : "User details are not found with provided combination of Email and Password. Please retry with the correct credentials."})
                }else{
                    console.log(data);

                    //Final solution
                    const id3 = data[0]._id;
                    res.redirect('/welcome-user?id='+id3);

                    //For trouble-shooting
                    //res.send(data);
                    //res.redirect('/welcome-user');
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user details with Email " + id1})
            })

    }else{
        res.status(404).send({ message : "Please provide Email and Password to login" })
    }
}

// retrieve user details based on '_id' value passed 
exports.find_by_id = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(data.length==0){
                    res.status(404).send({ message : "User details are not found with id " + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user details with id " + id})
            })

    }else{
         res.status(404).send({ message : "No '_id' value is passed while navigating to welcome-user page" })
         /* Fro trouble-shooting
         Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
        */
    }   
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
                //res.redirect('/welcome-user?id='+data[0]._id);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
                //res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

exports.find_by_choices = (req, res)=>{
    if(!req.body.choices){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.body.id;
    const topic_id = req.body.topic_id;
    const topic_index = req.body.topic_index;
    const question_id = req.body.question_id;
    const question_index = req.body.question_index;
    const choices = req.body.choices;
    const correctChoice = req.body.correctChoice;

    console.log('id: ' + id);
    console.log('topic_id: ' + topic_id);
    console.log('topic_index: ' + topic_index);
    console.log('question_id: ' + question_id);
    console.log('question_index: ' + question_index);
    console.log('choices: ' + choices);
    console.log('correctChoice: ' + correctChoice);
    
    Userdb.updateMany({ }, { $inc: { "quiz.$[topic].questionBank.$[question].counter": 1 } }, { arrayFilters: [ { "topic._id": topic_id }, { "question._id": question_id } ] } )
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                if(choices == correctChoice){
                    console.log('if-case updated-data: ' + data);
                    //res.send(data)
                    res.redirect('/correct?id='+id+'&topic_index='+topic_index+'&question_index='+question_index);
                }
                else{
                    console.log('else-case updated-data: ' + data);
                    //res.send(data)
                    res.redirect('/incorrect?id='+id+'&topic_index='+topic_index+'&question_index='+question_index);
                }
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}


// Updating for claimed reward points
exports.correct = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.body.id;
    const topic_id = req.body.topic_id;
    const topic_index = req.body.topic_index;
    const question_id = req.body.question_id;
    const question_index = req.body.question_index;
    const rewardPoints = req.body.rewardPoints;

    console.log('id: ' + id);
    console.log('topic_id: ' + topic_id);
    console.log('topic_index: ' + topic_index);
    console.log('question_id: ' + question_id);
    console.log('question_index: ' + question_index);
    console.log('rewardPoints: ' + rewardPoints);
    
    Userdb.updateMany({ }, { $set: { "quiz.$[topic].questionBank.$[question].pointsEarned": rewardPoints }}, { arrayFilters: [ { "topic._id": topic_id }, { "question._id": question_id } ] } )
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log('Updated Data: ' + data);
                //res.send(data)
                res.redirect('/topic?id='+id+'&topic_index='+topic_index);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Updating for user solution reward points
exports.user_solution = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.body.id;
    const topic_id = req.body.topic_id;
    const topic_index = req.body.topic_index;
    const question_id = req.body.question_id;
    const question_index = req.body.question_index;
    const userSolution = req.body.userSolution;

    console.log('id: ' + id);
    console.log('topic_id: ' + topic_id);
    console.log('topic_index: ' + topic_index);
    console.log('question_id: ' + question_id);
    console.log('question_index: ' + question_index);
    console.log('userSolution: ' + userSolution);
    
    Userdb.updateMany({ }, { $set: { "quiz.$[topic].questionBank.$[question].userSolution": userSolution }}, { arrayFilters: [ { "topic._id": topic_id }, { "question._id": question_id } ] } )
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log('Updated Data: ' + data);
                //res.send(data)
                res.redirect('/question?id='+id+'&topic_index='+topic_index+'&question_index='+question_index);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

exports.text_email = (req, res) =>{

    if(!(req.body.sender_email && req.body.sender_password && req.body.receiver_email && req.body.subject && req.body.sender_password && req.body.userSolution))
    {
        console.log('Warning: Please provide details in all fields to send email');
        return res
            .status(400)
            .send({ message : "Please provide details in all fields to send email" })
    }   
        const { sender_email, sender_password, receiver_email, subject, userSolution, id, topic_index, question_index } = req.body;

        const mailData = {
                from: sender_email,
                to: receiver_email,
                subject: subject,
                text: userSolution
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
            user: sender_email,
            pass: sender_password
            }
        })

        transporter.sendMail(mailData, (error, info) => {
                if (error){
                    res.status(500).send({ message : "Couldn't send the email"});
                    return console.log(error);
                }
                res.status(200).send({ message: "Mail send", message_id: info.messageID });
        })
}