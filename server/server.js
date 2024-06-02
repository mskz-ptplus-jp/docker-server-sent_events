const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const clientId = uuidv4();
  res.write('retry: 0\n');
  res.write(`data: Client connected with ID: ${clientId}\n\n`);

  let count = 0;
  const intervalId = setInterval(() => {
    res.write(`data: The time is ${new Date().toLocaleTimeString()}, Client ID: ${clientId}, Count: ${count + 1}\n\n`);
    count++;
    if (count >= 10) {
      res.write('data: Closing connection\n\n');
      res.write('event: close\n');
      res.write('data: \n\n');
      clearInterval(intervalId);
      res.end();
    }
  }, 1000);

  req.on('close', () => {
    clearInterval(intervalId);
    console.log(`Client ${clientId} disconnected`);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
