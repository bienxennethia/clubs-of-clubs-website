const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000' // Replace 'http://example.com' with your actual frontend URL
}));
app.use(express.json());

// Import API routes
const routes = require('./db/routes');
app.use('/', routes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
