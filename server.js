require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;
const host = process.env.IPAdd || '0.0.0.0';

app.get('/api/hello', (req, res) => {
    res.json({ message: "Hello, World!", status: 0 });
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
