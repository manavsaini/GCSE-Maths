var Userdb = require('../model/model');
var nodemailer = require('nodemailer');

// create and save a new user
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
                topic : "Ratio and Proportion", questionBank :
                [
                    {question : "Farah has two sweet jars. The jars contain the same number of sweets in total. 25% of the sweets in jar A are jelly beans. 1/3 of the sweets in jar B are jelly beans. There are 24 jelly beans in jar A, how many jelly beans are there in jar B?", choices : ["32", "34", "24", "22"], hints : "Consider x being the the total no. of sweets in each jar. Calculate x*(1/3) to obtain the final answer with the help of jelly beans count given for jar A.", correctChoice : "32", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "If 11 labourers take 8 hours to dig a hole, how long will it take 4 labourers to dig the same size hole?", choices : ["11", "44", "22", "33"], hints : "Calculate the total no. of hours needed to dig the hole by a labourer and then find the for the desired count of labourers.", correctChoice : "22", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "All the coins in my pocket are 50p coins or £1 coins. The ratio of 50p coins to £1 coins is 5:3. I have 48 coins in my pocket. What is the total value of the coins in my pocket?", choices : ["£36", "£35", "£33", "£39"], hints : "Consider x and y be the no. of 50p and £1 coins respectively. For 2 variables, form 2 equations and solve them for x and y to find the total value as (x/2)+y.", correctChoice : "£33", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Harry, Osky and Harvey share £87. Osky gets 3 times as much money as Harry. Harvey gets twice as much money as Osky. How much money does Harvey get?", choices : ["£34.8", "£17.4", "£52.2", "£26.1"], hints : "Consider x to be the amount of any of the person and form an equation with RHS being 87. Solve for x and find out the final answer accordingly.", correctChoice : "£52.2", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "David, Peter and Sara earn money in the ratio of 5:4:1. If David earns £80,000/year, how much more money does Peter earn than Sara?", choices : ["£4080", "£4800", "£48000", "£40800"], hints : "Split the ratios into 2 sub-ratios as 5:4 and 4:1. David's earning is already given so from that find Peter's earning followed by Sara's and calculate the difference in earnings as required.", correctChoice : "£48000", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" }
                ]
            },
            { 
                topic : "Probability", questionBank :
                [
                    {question : "A bag contains 2 red balls and 8 blue balls. 3 balls are taken from the bag at random. All 3 balls taken from the bag are of same colour. What is the probability that the next ball taken at random is red in colour?", choices : ["1/5", "1/3", "2/7", "2/5"], hints : "Check for the combination of remaining balls left and calculate accordingly keeping in mind that 3 balls are already taken away from the bag.", correctChoice : "2/7", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "A fair spinner has five equal sections numbered 1, 2, 3, 4 and 5. A fair six-sided dice has five red faces and one green face. The spinner is spun. If the spinner shows an even number, the dice is thrown. Work out the probability of getting an even number and the colour green.", choices : ["0.4", "0.215", "0.185", "0.066"], hints : "The chances are two in five, followed by one in six. So you multiply those fractions together to give you 2/30 or 0.066.", correctChoice : "0.066", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "A bag contains 3 red balls and 5 blue balls. 2 balls are taken from the bag at random, without replacement. What is the probability that the 2 balls taken are of same colour?", choices : ["13/28", "17/32", "14/15", "13/56"], hints : "Check for the combination of remaining balls left and calculate accordingly keeping in mind that 3 balls are already taken away from the bag.", correctChoice : "13/28", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Sally plays 3 games of tennis. Her probability of winning the first game is 3/5. If she wins a game, the probability she wins the next game is 2/3. If she loses a game, the probability that she wins the next game is 1/2. What is the probability that she wins exactly one game?", choices : ["1/10", "4/15", "1/3", "23/60"], hints : "There can be multiple combinations of winning exactly one game. Calculate the probability of each combination separately and sum it up.", correctChoice : "4/15", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "David has two 10p coins, four 5p coins and six 2p coins in his wallet. He removes three coins at random from the wallet, without replacement. What is the probability that the total value of the removed coins is more than 10p?", choices : ["9/11", "8/11", "23/33", "7/11"], hints : "There can be multiple combinations of withdrawing three coins having sum value more than 10p. Calculate the probability of each combination separately and sum it up.", correctChoice : "7/11", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" }
                ]
            },
            { 
                topic : "Statistics", questionBank :
                [
                    {question : "Find the mean value in the data set: {17,25,2,21,29,8,36,5,11,19}.", choices : ["17.3", "20.4", "18.9", "22.7"], hints : "Mean of X1,X2.....Xn items is (X1+X2+.....Xn)/n.", correctChoice : "17.3", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Mean score of a basketball team in 12 games is 93 points. What is the total number of points scored?", choices : ["1116", "1206", "954", "1012"], hints : "Mean of X1,X2.....Xn items is (X1+X2+.....Xn)/n.", correctChoice : "1116", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Find the range in the data set: {115,36,118,−12,33,−10,98,106,124,119}.", choices : ["134", "136", "124", "112"], hints : "Range is the difference between the lowest and highest values.", correctChoice : "136", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "John won at the lottery 2 times 50 pounds, 3 times 10 pounds, and 1 time 200 pounds. What is the average prize received by John?", choices : ["55", "56", "65", "60"], hints : "Calculate the sum of total times of winning divided by this total times.", correctChoice : "55", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "In a class of 28 students the mean height of the 12 boys is 1.58 metres, and the mean height of all 28 students is 1.52 metres. Work out the mean height of the girls.", choices : ["1.475", "1.375", "1.325", "1.315"], hints : "Mean of X1,X2.....Xn items is (X1+X2+.....Xn)/n", correctChoice : "1.475", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Find mode in the data set: {1.00,2.70,3.81,1.12,3.81,3.81,1.83}", choices : ["2.70", "3.81", "1.12", "1.00"], hints : "Mode is the most frequent value in a dataset.", correctChoice : "3.81", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Given data set: {17,15,16,17,16,18,20}, find median.", choices : ["18", "16", "17", "20"], hints : "Median is the middle value separating the greater and lesser halves of a data set.", correctChoice : "17", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" }
                ]
            },
            { 
                topic : "Numbers", questionBank :
                [
                    {question : "Which are real numbers in a given set: {1,2/5,-6,5,9^(1/2),150,0.25}?", choices : ["All except -6", "All", "All except 9^(1/2)", "All except 150,0.25"], hints : "A real number is a number that can be represeted on the real number line.", correctChoice : "All", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "All whole numbers are prime numbers.", choices : ["True", "True but only if they are negative whole numbers", "False", "True but only if they are positive whole numbers"], hints : "Consider an example that 4 is a whole number but it is not a prime number.", correctChoice : "False", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "If you add three different prime numbers, you will always get an odd number.", choices : ["True because all prime numbers are odd", "False", "True if you ignore negative prime numbers", "This is only true for fractional prime numbers"], hints : "Prime numbers are positive whole numbers divisible only by 1 and themselves given that 1 is not a prime number.", correctChoice : "False", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "If x=6-(-6)+6-6+(-6)-6, what is the position of x on the number line?", choices : ["x=6", "x=-6", "x=12", "x=0"], hints : "Try to work across from left to right step by step to obtain the final answer.", correctChoice : "x=0", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Nadia has £5 to buy pencils and rulers. Pencils are 8p each. Rulers are 30p each. She says “I will buy 15 pencils. Then I will buy as many rulers as possible. With my change I will buy more pencils.” How many pencils and how many rulers does she buy?", choices : ["17-pencils,12-rulers", "18-pencils,12-rulers", "17-pencils,10-rulers", "12-pencils,14-rulers"], hints : "Nadia spends £1.20 on the 15 pencils. She can then afford 12 rulers, costing £3.60. She has spent £4.80, so can afford two further pencils.", correctChoice : "17-pencils,12-rulers", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" },
                    {question : "Billy wants to buy these tickets for a show. 4 adult tickets at £15 each and 2 child tickets at £10 each. A 10% booking fee is added to the ticket price. 3% is then added for paying by credit card. Work out the total charge for these tickets when paying by credit card.", choices : ["88.64", "90.64", "94.64", "98.64"], hints : "It's a very simple percentage calculation scenario. Calculate step by step and you will get the correct answer.", correctChoice : "90.64", rewardPoints : 5, flag : "Y", counter : 0, pointsEarned: 0, userSolution : "" }
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

// Update a new identified user by user id
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
    const id = req.query.id;
    console.log('id: ' + id);

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                //res.send({ message : "User was deleted successfully!" })
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}

// Updating to track the attempts count of user and redirecting it to the page displaying the result of user's choice
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


// Updating claimed reward points shown as Earned Points for each question and overall total reward points shown as Credit Score 
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
                console.log('Points Earned updated');
                //res.send(data)
                //res.redirect('/topic?id='+id+'&topic_index='+topic_index);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
    
     Userdb.findByIdAndUpdate(id, { $inc: { "totalRewardPoints": rewardPoints }}, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                console.log('Total Reward Points Updated');
                //res.send(data)
                res.redirect('/topic?id='+id+'&topic_index='+topic_index);
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })    
}

// Saving user's solution
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

// Sending email based on the input details from user
exports.text_email = (req, res) =>{

    if(!(req.body.sender_email && req.body.sender_password && req.body.receiver_email && req.body.subject && req.body.sender_password && req.body.userSolution))
    {
        console.log('Warning: Please provide details in all fields to send email');
        return res
            .status(400)
            .send({ message : "Please provide details in all fields to send email" })
    }   
        const { sender_email, sender_password, receiver_email, subject, userSolution } = req.body;

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