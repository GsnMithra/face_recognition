const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('<your_mongo_uri>', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection
  .once ('open', () => console.log('Atlas database connected!'))
  .on ('error', err => console.log('Database connection failed!', err));

