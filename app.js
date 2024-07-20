
const express = require("express");
const mongoose = require("mongoose");
const nodemailer=require("nodemailer");
// const pageModel=require('./views/joblist')

const port = process.env.PORT || 5005;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

// Define Mongoose Schema
const dataSchema = new mongoose.Schema({
  // Define the structure of your data
  // Example:
  name:String,
  email:String,
  message:String,
  date:{
    type:Date,
    default:Date.now
  }
  // Add more fields as needed
});

const registerSchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    name: String,
    email: String,
    phoneno:Number,
    collegename:String,
    branch:String,
    password:String,
    date:{
      type:Date,
      default:Date.now
    }
    // Add more fields as needed
  });

  const feedbackSchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    name: String,
    email: String,
    rating:Number,
    message:String,
    date:{
      type:Date,
      default:Date.now
    }
    // Add more fields as needed
  });

  const companySchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    companyId: String,
    email: String,
    password: String,
    // Add more fields as needed
  });

  const jobsSchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    company_name: String,
    jobprofile: String,
    yoe:Number,
    yop:Number,
    jd:String,
    ctc:Number,
    date:{
      type:Date,
      default:Date.now
    }
    // Add more fields as needed
  });

  const applySchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    first_name:String,
      last_name:String,
      email:String,
      phone:String,
      job_rol: {
        type: String,
        enum: ['frontend', 'backend', 'full_stack', 'ui_ux'],
      },
      link:String,
      address:String,
      city: String,
      pin:Number,
      date: Date,
      // Assuming you want to store the file name(s) in the database
      files: [String,Buffer],
      date:{
        type:Date,
        default:Date.now
      }
    // Add more fields as needed
  });

  //admin schema
  const adminSchema = new mongoose.Schema({
    // Define the structure of your data
    // Example:
    adminId: String,
    email: String,
    password: String,
    // Add more fields as needed
  });

// Create Mongoose Model
const DataModel = mongoose.model("contactData", dataSchema);
const registerModel = mongoose.model("regiterData", registerSchema);
const feedbackModel = mongoose.model("feedbackData", feedbackSchema);
const applyModel = mongoose.model("applyData", applySchema);
const companyModel = mongoose.model("companydata", companySchema);
const jobsModel = mongoose.model("jobsdata", jobsSchema);
const adminModel = mongoose.model("admindata", adminSchema);



//mongodb://localhost:27017/mydatabase
// Connect to MongoDB   mongodb+srv://aswnsonern7:41P8AviGHoc4zyw5@cluster0.goyltun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

app.use(express.static('public'));

app.get('/offcampus', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// contactus data
// app.post('/offcampus', (req, res) => {
//   console.log(req.body);

//   // Save data to MongoDB
//   const newData = new DataModel(req.body);
//   newData.save().then(() => {
//     sendqEmail(req.body.email,req.body.name);
//     console.log("we will solve your query as soon as possible..");
//     res.sendFile(__dirname + '/public/index.html');
//   }).catch(err => {
//     console.error("Error saving data:", err);
//     res.status(500).sendFile(__dirname + '/public/error.html'); 
//     });
// });


app.post('/offcampus', async (req, res) => {
  console.log(req.body);

  // Save data to MongoDB
  const newData = new DataModel(req.body);
  
  try {
    await newData.save();
    await sendqEmail(req.body.email, req.body.name);
    console.log("We will solve your query as soon as possible.");
    res.sendFile(__dirname + '/public/index.html');
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).sendFile(__dirname + '/public/error.html');
  }
});


  // Nodemailer setup


// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587, // or 465 for SSL
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'asuydv9433@gmail.com', // your Gmail account
    pass: 'exypdawsevrwcnbg' // your Gmail password or App Password if 2FA is enabled
  }
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error(error);
  } else {
    console.log('Server is ready to take our messages:', success);
  }
});

function sendqEmail(email,name){
  let mailOptions = {
    from: 'asuydv9433@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Offcampus.com', // Subject line
    text: 'team offcampus.com', // plain text body
    html: `<b>Dear ${name},<br> Welcome in Offcampus.com! we will solve your query as soon as possible.. <br><br>Best regards,<br>Team OffCampus.com </b>` // html body
  };
  
  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
  }

// Set up email data exypdawsevrwcnbg
function sendEmail(email,name){
let mailOptions = {
  from: 'asuydv9433@gmail.com', // sender address
  to: email, // list of receivers
  subject: 'Offcampus.com', // Subject line
  text: 'team offcampus.com', // plain text body
  html: `<b>Dear ${name},<br> Welcome in Offcampus.com! You are successfully registered in offcampus.com. <br><br>Best regards,<br>Team OffCampus.com </b>` // html body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error(error);
  }
  console.log('Message sent: %s', info.messageId);
});
}




//register data

app.post('/register',(req, res) => {
    console.log(req.body);
    const email=req.body.email;
    const name=req.body.name;
    // Save data to MongoDB
    const regData = new registerModel(req.body);
    regData.save().then(() => {
      sendEmail(email,name);
      console.log("You are successfully registered in OffCampus.com!");
      res.sendFile(__dirname + '/public/index.html');
    }).catch(err => {
      console.error("Error saving data:", err);
      res.status(500).sendFile(__dirname + '/public/error.html');    });
    });




  //loginin form 

  app.post("/login",async(req,res)=>{
    try{
      const email=req.body.email;
      const password=req.body.password;

      const userEmail=await registerModel.findOne({email:email});
      if(userEmail.password===password){
 // Send welcome email after successful login
        // sendWelcomeEmail(userEmail.email, userEmail.name);
        console.log("You are successfully login in OffCampus.com!");
        res.status(201).sendFile(__dirname + '/public/account.html');
      }
      else{
        res.status(500).sendFile(__dirname + '/public/invalid.html');
      }
    }catch(error){
      res.status(500).sendFile(__dirname + '/public/invalid.html');

    }
  });

  
  //feedback data

  function sendEmailFeedback(email,name){
    let mailOptions = {
      from: 'asuydv9433@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Offcampus.com', // Subject line
      text: 'team offcampus.com', // plain text body
      html: `<b>Dear ${name},<br>Thankyou! We all need people who will give us feedback. That’s how we improve. <br><br>Best regards,<br>Team OffCampus.com </b>` // html body
    };
    
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    }


  app.post('/sendfeedback', (req, res) => {
    console.log(req.body);
    const email=req.body.email;
    const name=req.body.name;
    // Save data to MongoDB
    const feedData = new feedbackModel(req.body);
    feedData.save().then(() => {
      sendEmailFeedback(email,name);
      res.sendFile(__dirname + '/public/feedback.html');
      console.log("Thankyou for giving feedback!");
    }).catch(err => {
      console.error("Error saving data:", err);
      res.status(500).sendFile(__dirname + '/public/error.html'); 
    });
  });

  //Apply data

  function sendEmailApply(email,name,post){
    let mailOptions = {
      from: 'asuydv9433@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Offcampus.com', // Subject line
      text: 'team offcampus.com', // plain text body
      html: `<b>Dear ${name},<br>You are successfully applied for ${post} profile.<br><br>Best regards,<br>Team OffCampus.com </b>` // html body
    };
    
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.error(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
    }


  app.post('/applyforjob', (req, res) => {
    console.log(req.body);
    const email=req.body.email;
    const name=req.body.first_name + req.body.last_name;
    const post=req.body.job_rol
    // Save data to MongoDB
    const applyData = new applyModel(req.body);
    applyData.save().then(() => {
      sendEmailApply(email,name,post)
      res.sendFile(__dirname + '/public/jobsearch.html');
      console.log("Your Application successfully Submitted!");
    }).catch(err => {
      console.error("Error saving data:", err);
      res.status(500).sendFile(__dirname + '/public/error.html'); 
    });
  });


 

  app.set("view engine","ejs");

    //companies data

    app.post('/jobs',(req, res) => {
      console.log(req.body);
      // Save data to MongoDB
      const jobData = new jobsModel(req.body);
      jobData.save().then(() => {
        // sendEmail(email,name);
        console.log("You are successfully add your company's job profile in OffCampus.com!");
        res.sendFile(__dirname + '/public/addjob.html');
      }).catch(err => {
        console.error("Error saving data:", err);
        res.status(500).sendFile(__dirname + '/public/invalid.html');
      });
      });


      //jobs list 

  app.get('/joblist',(req, res) => {
    jobsModel.find({})
    .then((x)=>{
      // res.sendFile(__dirname + '/views/joblist.js',{x});
        res.render('./joblist',{x});
        console.log(x);

      })
      .catch((y)=>{
        console.log(y)
      })
    });

  //company register

  app.post('/companyregister', (req, res) => {
    console.log(req.body);
  
    // Save data to MongoDB
    const newData = new companyModel(req.body);
    newData.save().then(() => {
      res.sendFile(__dirname + '/public/companylogin.html');
    }).catch(err => {
      console.error("Error saving data:", err);
      res.status(500).sendFile(__dirname + '/public/error.html'); 
    });
  });


  //company login

  app.post("/companylogin",async(req,res)=>{
    try{
      const email=req.body.email;
      const password=req.body.password;

      const userEmail=await companyModel.findOne({email:email});
      if(userEmail.password===password){
 // Send welcome email after successful login
        // sendWelcomeEmail(userEmail.email, userEmail.name);
        console.log(`${userEmail.email} , You are successfully login in OffCampus.com!`);
        res.status(201).sendFile(__dirname + '/public/addjob.html');
      }
      else{
        res.status(500).sendFile(__dirname + '/public/invalid.html');
      }
    }catch(error){
      res.status(500).sendFile(__dirname + '/public/invalid.html');

    }
  });

  //get all data for admin panel
//registered users
  app.get('/register',(req, res) => {
    registerModel.find({})
    .then((register)=>{
      // res.sendFile(__dirname + '/views/joblist.js',{x});
        res.render('./register',{register});
        console.log(register);

      })
      .catch((err)=>{
        console.log(err)
      })
    });

//feedbacks

app.get('/getFeedback',(req, res) => {
  feedbackModel.find({})
  .then((feedback)=>{
    // res.sendFile(__dirname + '/views/joblist.js',{x});
      res.render('./feedback',{feedback});
      console.log(feedback);

    })
    .catch((err)=>{
      console.log(err)
    })
  });

  // fetch queries

  app.get('/getqueries',(req, res) => {
    DataModel.find({})
    .then((query)=>{
      // res.sendFile(__dirname + '/views/joblist.js',{x});
        res.render('./queries',{query});
        console.log(query);
  
      })
      .catch((err)=>{
        console.log(err);
      })
    });

    //joblist for admin panel

    app.get('/getjobs',(req, res) => {
      jobsModel.find({})
      .then((jblist)=>{
        // res.sendFile(__dirname + '/views/joblist.js',{x});
          res.render('./jobsAdmin',{jblist});
          console.log(jblist);
    
        })
        .catch((err)=>{
          console.log(err)
        })
      });


      //All job Application

    app.get('/jobapplications',(req, res) => {
      applyModel.find({})
      .then((application)=>{
        // res.sendFile(__dirname + '/views/joblist.js',{x});
          res.render('./jobApplications',{application});
          console.log(application);
    
        })
        .catch((err)=>{
          console.log(err)
        })
      });
   
      //remove 

  //admin register

  app.post('/adminregister', (req, res) => {
    console.log(req.body);
  
    // Save data to MongoDB
    const newData = new adminModel(req.body);
    newData.save().then(() => {
      res.sendFile(__dirname + '/public/adminlogin.html');
    }).catch(err => {
      console.error("Error saving data:", err);
      res.status(500).sendFile(__dirname + '/public/error.html'); 
    });
  });

  //admin-login

  app.post("/adminlogin",async(req,res)=>{
    try{
      const adminId=req.body.adminId;
      const password=req.body.password;

      const userid=await adminModel.findOne({adminId:adminId});
      if(userid.password===password){
 // Send welcome email after successful login
        // sendWelcomeEmail(userEmail.email, userEmail.name);
        console.log(`Dear Admin, You are successfully login in OffCampus.com!`);
        res.status(201).sendFile(__dirname + '/public/allaccess.html');
      }
      else{
        res.status(500).sendFile(__dirname + '/public/invalid.html');
      }
    }catch(error){
      res.status(500).sendFile(__dirname + '/public/invalid.html');

    }
  });

//remove

// app.delete('/getjobs/:id',(req, res) => {
//   const id=req.params.id
//   jobsModel.findByIdAndDelete({id})
//   .then((jblist)=>{
//     // res.sendFile(__dirname + '/views/joblist.js',{x});
//       res.render('./jobAdmin',{jblist});
//       console.log(jobsModel.findByIdAndDelete({id}));

//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   });


app.listen(port, () => {
  console.log(`server started at ${port}`);
});
