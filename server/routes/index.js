var todosController = require('../controllers').todos
var todoItemsController = require('../controllers').todoItems
var userController = require('../controllers/user');

module.exports = (app) => {
  app.get('/api', (req, res) => {
    res.status(200).send({
      message: 'Welcome to the Todos API!'
    })
  })

  app.post('/api/sign_up', userController.sign_up)
  app.post('/api/sign_in', userController.sign_in)

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.post('/api/todos/:todoId/todoItems', todoItemsController.create);
  app.get('/api/todos/:todoId', todosController.retrieve);
  app.put('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);
  app.put('/api/todos/:todoId/todoItems/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/todoItems/:todoItemId', todoItemsController.destroy);

  // For any other request method on todo items, we're going to return "Method Not Allowed"
  app.all('/api/todos/:todoId/todoItems', (req, res) =>
    res.status(405).send({
      message: 'Method Not Allowed',
    }));
}