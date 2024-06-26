const app = require('./app'); // Change this line

const port = process.env.PORT || 3000;

const db = require('./config/db');

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
