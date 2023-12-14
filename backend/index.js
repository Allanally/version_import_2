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
app.post('/session', (req, res) => {
  UserModel.findOne(req.body)
  .then(result => {res.json(result)
    console.log(result) })
 
  .catch(err => {
    console.error('Error Fetching User', err);
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
