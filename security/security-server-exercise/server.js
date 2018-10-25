const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const morgan     = require('morgan');
const winston    = require('winston');
const bodyParser = require('body-parser');
const uuidv4     = require('uuid/v4');
const app = express();

// const whitelist = ['https://www.google.com', 'http://localhost:3000'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) callback(null, true);
//     else callback(new Error('Not allowed by CORS'));
//   }
// };
// app.use(cors(corsOptions));

app.use(cors());
app.use(morgan('tiny'));
app.use(helmet());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const id = uuidv4();
  res.cookie('session', id, { httpOnly: true });
  res.cookie('session', id, { secure: true });
  res.set({
    'Content-Security-Policy': 'script-src "self" "https://apis.google.com"'
  });
  res.send('Hello World!');
})

app.post('/secret', (req, res) => {
  const { userInput } = req.body;
  console.log({userInput});
  if (userInput) {
    winston.log('info', 'user input: ' + userInput);
    res.status(200).json('success');
  } else {
    winston.error('This guy is messing with us:' + userInput);
    res.status(400).json('incorrect submission')
  }
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))