const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
require('./src/config/db');
const auth = require('./src/routes/authRouter');

dotenv.config();

app.use(express.json());
app.use(cors());

app.use('/api/users', auth);
app.use('/api', auth);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})



