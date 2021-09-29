const  express= require('express');;
const app = express();
const bodyParser = require('body-parser');
const usersRouter = require('./routes/usersRoutes.js');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'crud';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');
    console.log('collection name: ' ,collection);
    // the following code examples can be pasted here...
  
    return 'done.';
  }
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());*/


app.get('/', function(req, res) {
    res.send('Please use API endpoint /users');
});
 app.use('/users',usersRouter);

app.listen(3000);
console.log('running on port 3000');