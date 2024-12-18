const express = require('express');
const app = express();
const db = require('./db/connection');
const todosRoutes = require('./routes/todos');
const authRoutes = require('./routes/auth');
const cors = require('cors');
app.use(express.json());
app.use(cors({
    origin: 'https://chanez-mytodolist-2.netlify.app', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    credentials: true // Enable credentials if required
}));

app.get("/", (req, res) => {
    res.send("hello world");
})

app.use('/api/todos', todosRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
