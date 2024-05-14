// const express = require('express');
// const mySqlpool = require('./config/db_conn');
// const app = express();
// const PORT = 3000;

// app.get('/hi', (req, res) => {
//     res.status(200).send("<h1>Creating MySQL app! </h1>");
// });

// // Remove the attempt to execute a query here
// // mySqlpool.query('select * from student').then(() => {
// //     app.listen(PORT, () => {
// //         console.log("server is listing on port number 3000");
// //     });
// // }).catch((error) => {
// //     console.log(error);
// // });

// // Connect to MySQL 
// mySqlpool.getConnection((err, connection) => {
//     if (err) {
//         throw err;
//     }
//     console.log('MySQL connected!......');

//     // Execute a query here
//     connection.query('select * from student_profile', (error, results, fields) => {
//         if (error) {
//             console.error('Error executing query:', error);
//             return;
//         }
//         console.log('Query results:', results);

//         // Release the connection after executing the query
//         connection.release();

//         // Start the Express server after obtaining a connection
//         app.listen(PORT, () => {
//             console.log("server is listening on port number 3000");
//         });
//     });
// });
/////////////////////////all operation is work
const express = require('express');
const mysql = require('mysql2');
const mySqlpool = require('./config/db_conn');
const app = express();
const PORT = 3000;

app.use(express.json());
//insert new data into mysql workbench
app.post('/students',(req,res)=>{
    const {id,first_name,second_name,dob,Eyear}=req.body;
    mySqlpool.query('insert into student_profile (id,first_name,second_name,dob,Eyear) values (?,?,?,?,?)',[id,first_name,second_name,dob,Eyear],(error, results, fields)=>{
         
    if(error){
        console.log("Error creating student ",error);
        res.status(500).json({error:"Error creating student"})
        return;
    }
    res.status(201).json({message:"Student created successfully"})
    

    });
});
//how to display from database mysql
app.get('/display',(req,res)=>{
    mySqlpool.query('select * from student_profile',(error,results,fields)=>{
        if(error){
            console.error("not displayed error happen",error);
            res.status(500).json({error:"error on retriving data from database!"})
        }
        res.status(201).json(results)
    })
})
//for updating data 
app.listen(PORT,(req,res)=>{
    console.log(`server is listening on port number ${PORT}`);
})
