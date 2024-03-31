const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const routes = require('./db/routes');
app.use('/', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
