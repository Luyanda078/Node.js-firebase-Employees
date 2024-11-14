const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const firebaseAdmin = require('firebase-admin');  // Import Firebase Admin SDK
const multer = require('multer');  // For file handling
const app = express();
const port = 5000;

const upload = multer({ storage: multer.memoryStorage() });


// Initialize Firebase Admin SDK
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(require('./firebase-service-account-key.json')),
  storageBucket: 'employeesapp-d4069.firebasestorage.app' 
});

const db = firebaseAdmin.firestore();
const bucket = firebaseAdmin.storage().bucket();

// Middleware to parse JSON
app.use(bodyParser.json());


// Welcome route to greet users
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Employee Management System!');
});

// Read employee data from the JSON file
const readEmployeeData = () => {
  const rawData = fs.readFileSync('employees.json');
  return JSON.parse(rawData);
};

// Save employee data to the JSON file
const saveEmployeeData = (data) => {
  fs.writeFileSync('employees.json', JSON.stringify(data, null, 2));
};

// 1. Add Employee
app.post('/addEmployee', async (req, res) => {
    try {
      const { id, name, surname, age, role, photo } = req.body;
      const newEmployee = { id, name, surname, age, role, photo };
  
      // Add employee data to Firestore
      await db.collection('employees').doc(id).set(newEmployee);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).send('Error adding employee');
    }
  });
  

// 2. Get All Employees
app.get('/getEmployees', async (req, res) => {
    try {
      const snapshot = await db.collection('employees').get();
      const employees = snapshot.docs.map(doc => doc.data());
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).send('Error fetching employees');
    }
  });
  

// 3. Update Employee
app.put('/updateEmployee/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    try {
      await db.collection('employees').doc(id).update(updatedData);
      res.status(200).send('Employee updated');
    } catch (error) {
      res.status(500).send('Error updating employee');
    }
  });
  

// 4. Delete Employee
app.delete('/deleteEmployee/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      await db.collection('employees').doc(id).delete();
      res.status(200).send('Employee deleted');
    } catch (error) {
      res.status(500).send('Error deleting employee');
    }
  });
  
// 5. Search Employee by ID
app.get('/searchEmployee/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      const employeeDoc = await db.collection('employees').doc(id).get();
      if (employeeDoc.exists) {
        res.status(200).json(employeeDoc.data());
      } else {
        res.status(404).send('Employee not found');
      }
    } catch (error) {
      res.status(500).send('Error fetching employee');
    }
  });


// 1. Add Employee
app.post('/addEmployee', async (req, res) => {
    try {
      const { id, name, surname, age, role, photo } = req.body;
      const newEmployee = { id, name, surname, age, role, photo };
  
      // Add employee data to Firestore
      await db.collection('employees').doc(id).set(newEmployee);
      res.status(201).json(newEmployee);
    } catch (error) {
      res.status(500).send('Error adding employee');
    }
  });
  
  // 2. Get All Employees
  app.get('/getEmployees', async (req, res) => {
    try {
      const snapshot = await db.collection('employees').get();
      const employees = snapshot.docs.map(doc => doc.data());
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).send('Error fetching employees');
    }
  });
  
  // Other routes like update and delete...
  
  // 6. Upload Employee Photo
  app.post('/uploadPhoto/:id', upload.single('photo'), async (req, res) => {
    const id = req.params.id;
    const file = req.file;
  
    if (!file) {
      return res.status(400).send('No file uploaded');
    }
  
    const blob = bucket.file(`employee_photos/${id}-${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });
  
    blobStream.on('error', (error) => {
      res.status(500).send('File upload error');
    });
  
    blobStream.on('finish', async () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
  
      // Update Firestore with photo URL
      await db.collection('employees').doc(id).update({ photo: publicUrl });
      res.status(200).json({ photoUrl: publicUrl });
    });
  
    blobStream.end(file.buffer);
  });
  
  

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
