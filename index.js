const express = require('express');
const process = require('process');
const redis = require('redis');

const app = express();

const client = redis.createClient({
  host: 'redis',
  port: 6379
});
client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send(visits + ' people have visited this website.');
    client.set('visits', parseInt(visits) + 1)
  });
});

app.get('/exit', (req, res) => {
  process.exit(0);
});

app.listen(8081, () => {
  console.log('Listening on http://localhost:8081');
});