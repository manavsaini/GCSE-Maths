const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');

/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description welcome user
 *  @method GET /welcome-user
 */
 route.get('/welcome-user', services.welcome_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)

/**
 *  @description for delete user
 *  @method DELETE /delete-user
 */
 route.get('/delete-user', services.delete_user)

/**
 *  @description to naviagate to topic page
 *  @method GET /topic
 */
 route.get('/topic', services.topic)

 /**
 *  @description to naviagate to question page
 *  @method GET /question
 */
  route.get('/question', services.question)

/**
 *  @description to naviagate to help page
 *  @method GET /help-user
 */
   route.get('/help-user', services.help_user)

/**
 *  @description to naviagate to correct answer page
 *  @method GET /correct
 */
 route.get('/correct', services.correct)

 /**
 *  @description to naviagate to incorrect answer page
 *  @method GET /incorrect
 */
  route.get('/incorrect', services.incorrect)

// API
route.post('/api/users', controller.create);
route.get('/api/users', controller.login);
route.get('/api/users/find-by-id', controller.find_by_id);
route.put('/api/users/:id', controller.update);
route.get('/api/users/delete', controller.delete);
route.post('/api/users/find-by-choices', controller.find_by_choices);
route.post('/api/users/correct', controller.correct);
route.post('/api/users/user-solution', controller.user_solution);
route.post('/api/users/text-email', controller.text_email);

module.exports = route