import express from 'express';
import proxy from 'express-http-proxy';

const app = express();
const port = 3003;

const ROCKET_CHAT_URL = 'http://localhost:3000';

app.use('/', proxy(ROCKET_CHAT_URL));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
