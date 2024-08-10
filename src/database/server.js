const server = require('server');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = server ();
const PORT = 3000;

app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'data.json');

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    fs.readFile(usersFilePath, (err, data) => {
        if (err) {
            console.error('Error reading database file:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }
        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            return res.status(200).json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
