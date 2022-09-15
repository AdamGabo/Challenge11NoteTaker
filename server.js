const PORT = process.env.PORT || 3001;

const app = express();

const { animals } = require('./data/animals');

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });
  
  app.get('/api/animals', (req, res) => {
    res.send('Hello!');
  });