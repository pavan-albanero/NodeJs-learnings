var  express= require('express');;
var app = express();
var bodyParser = require('body-parser');
var usersRouter = require('./routes/usersRoutes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/', function(req, res) {
    res.send('Please use API endpoint /api/users');
});
 app.use('/users',usersRouter);

app.listen(3000);
console.log('running on port 3000');