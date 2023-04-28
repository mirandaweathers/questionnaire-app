const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Create a new database object and connect to it
const db = new sqlite3.Database('database.db');

// Create a "client" table with the specified columns, including an auto-incrementing ID
db.run(`
  CREATE TABLE IF NOT EXISTS client (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    address TEXT,
    email TEXT,
    phone TEXT,
    budget TEXT,
    adults TEXT,
    kids TEXT,
    pets TEXT,
    notes TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS bedroom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client TEXT NOT NULL,
    brStyle TEXT,
    brMood TEXT,
    brActivities TEXT,
    brColor TEXT,
    bedding TEXT,
    brFurnitureToKeep TEXT,
    brNotes TEXT,
    FOREIGN KEY (client) REFERENCES client (email)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS livingroom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client TEXT NOT NULL,
    lrStyle TEXT,
    lrMood TEXT,
    lrColor TEXT,
    lrActivities TEXT,
    lrEntertaining TEXT,
    lrFurnitureToKeep TEXT,
    lrnotes TEXT,
    FOREIGN KEY (client) REFERENCES client (email)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS diningroom (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client TEXT NOT NULL,
    drStyle TEXT,
    drMood TEXT,
    drColor TEXT,
    drStorage TEXT,
    drMeals TEXT,
    drEntertaining TEXT,
    drFurnitureToKeep TEXT,
    drNotes TEXT,
    FOREIGN KEY (client) REFERENCES client (email)
  )
`);

// Middleware to parse request body
app.use(express.json());

// Route to add a new client
app.post('/clients', (req, res) => {
  const { firstName, lastName, address, email, phone, budget, adults, kids, pets, notes } = req.body;

  // Check if the required fields are present in the request body
  if (!firstName || !lastName || !address || !email || !phone) {
    res.status(400).send('Missing required fields');
    return;
  }

  // Add the new client to the database
  db.run('INSERT INTO client (firstName, lastName, address, email, phone, budget, adults, kids, pets, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [firstName, lastName, address, email, phone, budget, adults, kids, pets, notes], function(err) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    // Get the ID of the newly-inserted row
    const id = this.lastID;
    const message = `Client with ID ${id} added successfully`;
    res.send(JSON.stringify(message));
  });
});

// Home route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Get all clients route
app.get('/clients', (req, res) => {
  db.all('SELECT * FROM client', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(rows);
  });
});

// Get all bedrooms for a client
app.get('/client/:clientEmail/bedrooms', (req, res) => {
  db.all('SELECT * FROM bedroom WHERE client = ?', [req.params.clientEmail], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(rows);
  });
});

// Get all living rooms for a client
app.get('/client/:clientEmail/livingrooms', (req, res) => {
  db.all('SELECT * FROM livingroom WHERE client = ?', [req.params.clientEmail], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(rows);
  });
});

// Get all dining rooms for a client
app.get('/client/:clientEmail/diningrooms', (req, res) => {
  db.all('SELECT * FROM diningroom WHERE client = ?', [req.params.clientEmail], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }
    res.send(rows);
  });
});

app.post('/bedroom', (req, res) => {
    const { client, style, mood, activities, color, bedding, furnitureToKeep, otherNotes } = req.body;
  
    
  // Check if the required fields are present in the request body
  if (!client) {
    res.status(400).send('Missing client email');
    return;
  }

  // Add the new client to the database
  db.run(
    'INSERT INTO bedroom (client, brStyle, brMood, brActivities, brColor, bedding, brFurnitureToKeep, brNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [client, style, mood, activities, color, bedding, furnitureToKeep, otherNotes], 
    function(err) {
        if (err) {
            console.error(err);
            res.status(500).send('Internal server error');
            return;
        }
        
        const message = `Bedroom data added with ID ${this.lastID}`;
        res.send(JSON.stringify(message));
    });
});

app.post('/livingroom', (req, res) => {
    const { client, style, mood, color, activities, entertaining, furniture, notes } = req.body;

    if (!client) {
        res.status(400).send('Missing client email');
        return;
    }

    db.run(
        'INSERT INTO livingroom (client, lrStyle, lrMood, lrColor, lrActivities, lrEntertaining, lrFurnitureToKeep, lrNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
        [client, style, mood, color, activities, entertaining, furniture, notes], 
        function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }
            
            const message = `Living room data added with ID ${this.lastID}`;
            res.send(JSON.stringify(message));
        });
});

app.post('/diningroom', (req, res) => {
    const { client, style, mood, color, storage, meals, entertaining, furniture, notes } = req.body;

    if (!client) {
        res.status(400).send('Missing client email');
        return;
    }

    db.run(
        'INSERT INTO diningroom (client, drStyle, drMood, drColor, drStorage, drMeals, drEntertaining, drFurnitureToKeep, drNotes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        [client, style, mood, color, storage, meals, entertaining, furniture, notes], 
        function(err) {
            if (err) {
                console.error(err);
                res.status(500).send('Internal server error');
                return;
            }
            
            const message = `Dining room data added with ID ${this.lastID}`;
            res.send(JSON.stringify(message));
        });
});

app.get('/allclientdata', (req, res) => {
    const sql = `
      SELECT client.*, 
             livingroom.*, 
             bedroom.*, 
             diningroom.*
      FROM client 
      LEFT JOIN livingroom ON client.email = livingroom.client 
      LEFT JOIN bedroom ON client.email = bedroom.client 
      LEFT JOIN diningroom ON client.email = diningroom.client
    `;
  
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send('Internal server error');
      } else {
        // return the client data with livingroom, bedroom, and diningroom data as JSON
        res.send({clientData: rows});
      }
    });
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
