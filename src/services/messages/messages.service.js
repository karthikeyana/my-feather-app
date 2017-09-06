// Initializes the `messages` service on path `/messages`
const mongoose = require('mongoose');
const createService = require('feathers-mongoose');
const Message = require('../../models/messages.model');
const hooks = require('./messages.hooks');
const filters = require('./messages.filters');

module.exports = function () {
  
  const app = this;
  const paginate = app.get('paginate');

  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost:27017/feathers', { useMongoClient: true });

  const options = {
    name: 'message',
    Model: Message,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/messages', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('messages');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
