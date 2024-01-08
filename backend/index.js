const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const PendingModel = require('./models/Pending');
const FaultModel = require('./models/Fault');
const PermissionModel = require('./models/Permission')
const UserModel = require('./models/User')
const cookieParser = require('cookie-parser');
const authRoutes = require("./Routes/AuthRoutes");
const RequestModel = require('./models/Requests');
const StudentModel = require('./models/Student');
const FaultingModel = require('./models/Faulting')
const bcrypt = require('bcrypt'); 
require('dotenv').config();


app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  method: ["GET", "POST"],
  credentials: true,
}));
app.use(cookieParser())
app.use(authRoutes);

const dbURI  = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

  app.post('/students', async (req, res) => {
    try {
      const streamPattern = new RegExp(req.body.stream, 'i');
      const students = await StudentModel.find({ stream: streamPattern });
  
      res.json(students);
      console.log(students);
    } catch (err) {
      console.error('Error fetching students:', err);
      res.status(500).json("Server error");
    }
  });
  
  app.get('/faulting', (req, res) => {
    FaultingModel.find({})
    .then(faultings => res.json(faultings))
    .catch(err => {
      console.error('Error fetching faultings:', err);
      res.status(500).json("Server error");
    });
  })

app.post('/fault', (req, res) => {
  FaultModel.create(req.body)
    .then(fault => res.json(fault))
    .catch(err => {
      console.error('Error creating fault:', err);
      res.status(500).json("Server error");
    });
});
app.post("/", (req,res) => {
  
})
app.post('/forgotpwd', (req, res) => {
    UserModel.findOne(req.body)
    .then(result => {res.json(result)
      console.log(result) })
   
    .catch(err => {
      console.error('Error Fetching User', err);
      res.status(500).json("Server error");
    });
})


app.post('/changepwd', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    if (!email || !pwd) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }
    const hashedPassword = await bcrypt.hash(pwd, 10); 
    const result = await UserModel.findOneAndUpdate(
      { email },
      { $set: { password: hashedPassword } },
      { new: true } 
    );

    if (result) {
      console.log('Password updated successfully:', result);
      return res.json({ message: 'Password updated successfully.' });
    } else {
      console.log('User not found.');
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error updating password:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/permissions', (req, res) => {
  PermissionModel.find({})
    .then(permissions => res.json(permissions))
    .catch(err => {
      console.error('Error fetching permissions:', err);
      res.status(500).json("Server error");
    });
});
app.post('/request', (req, res) => {
  RequestModel.create(req.body)
  .then(request => {res.json(request)
  console.log(request)})
  .catch(err => {
    console.error('Error Creating Request', err);
    res.status(500).json("Server error");
  });
})


app.post('/permission', (req, res) => {
  PermissionModel.create(req.body)
    .then(permission => {res.json(permission)
    console.log(permission)})
    .catch(err => {
      console.error('Error saving permission:', err);
      res.status(500).json("Server error");
    });
});

app.post('/pendings', (req, res) => {
PendingModel.create(req.body)
.then(pending => res.json(pending))
.catch(err => {
  console.error('Error saving permission:', err);
      res.status(500).json("Server error");
})
})

app.get('/pendings', (req,res) => {
  PendingModel.find({})
  .then(pending => res.json(pending))
      .catch(err => {
        console.error('Error fetching permissions:', err);
        res.status(500).json("Server error");
      });
})

app.delete('/pendings', (req, res) => {
  PendingModel.findOneAndDelete(req.body)
  .then(pending => res.json(pending))
  .catch(err => {
    console.error('Error deleting permissions:', err);
    res.status(500).json("Server error");
  });
})

app.listen(1338, () => {
  console.log("Server is running");
});
