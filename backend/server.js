const express = require('express');
const app = express();
const port = 3000;

app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from the Express.js backend!' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
