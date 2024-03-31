const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

const routes = require('./db/routes');
app.use('/', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
