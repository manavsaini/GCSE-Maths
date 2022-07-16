const axios = require('axios');

exports.homeRoutes = (req, res) =>{
    res.render('index');
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.welcome_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users/find-by-id', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("welcome_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users/find-by-id', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.delete_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users/find-by-id', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("delete_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}