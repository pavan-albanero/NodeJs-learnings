const  express= require('express');;
const app = express();
const usersRouter = require('./routes/userRoutes.js');
const logger=require('./util/logger.js');
require('./util/database.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', function(req, res) {
    res.json('Please use API endpoint /users');
});
 app.use('/users',usersRouter);

app.listen(3000);
logger.info('running on port 3000');

module.exports = app;
process.on( 'SIGINT', function() {
  logger.info( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit( );
})