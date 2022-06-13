// import express from 'express';

const {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  editUserByIdHandler,
  deleteUserByIdHandler,
} = require('./handler');

// // eslint-disable-next-line new-cap
// const router = express.Router();


// router.get('/', getAllUsersHandler);

// router.post('/users', addUserHandler);

// router.get('/users/{userId}', getUserByIdHandler);

// router.put('/users/{userId}', editUserByIdHandler);

// router.delete('/users/{userId}', deleteUserByIdHandler);

const routes = [
    {
        method: 'POST',
        path: '/users',
        handler: addUserHandler,
      },
      {
        method: 'GET',
        path: '/',
        handler: getAllUsersHandler,
      },
      {
        method: 'GET',
        path: '/users/{userId}',
        handler: getUserByIdHandler,
      },
      {
        method: 'PUT',
        path: '/users/{userId}',
        handler: editUserByIdHandler,
      },
      {
        method: 'DELETE',
        path: '/users/{userId}',
        handler: deleteUserByIdHandler,
      },
];

module.exports = routes;