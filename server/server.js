import express from 'express';
import pool from './db.js';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app=express(); 
const port=5000;


app.use(cors());
app.use(express.json());

pool.connect();

app.get('/todos/:userEmail',async(req,res)=>{
    const {userEmail}=req.params;
    try {
        const todos=await pool.query("select * from todos where user_email=$1",[userEmail] );
        res.json(todos.rows);
    } catch (error) {
        console.error(error);
    }
})

//create a new todo
app.post('/todos',async(req,res)=>{
    const {user_email,title,progress,date}=req.body;
    console.log(user_email,title,progress,date)
    const id=uuidv4()
    try {
        const newTodo=await pool.query(`INSERT INTO todos values($1,$2,$3,$4,$5)`,[ id,user_email,title,progress,date])
        res.json(newTodo)
    } catch (error) {
        console.error(error);
    }
})
 
//edit a todo
app.put('/todos/:id',async(req,res)=>{
    const {id}=req.params;
    const {user_email,title,progress,date}=req.body;
    try {
       const editTodo=await pool.query('UPDATE todos SET user_email=$1,title=$2,progess=$3,date=$4 WHERE id=$5;',[user_email,title,progress,date,id])
       res.json(editTodo)
       console.log(editTodo);
    } catch (error) { 
        console.error(error);
    }
})

//delete a todo
app.delete('/todos/:id',async(req,res)=>{
    const {id}=req.params;
   
    try {
        const deleteTodo=await pool.query('DELETE FROM todos WHERE id=$1',[id])
        res.json(deleteTodo)
     } catch (error) { 
         console.error(error);
     }
    
})

//signup
app.post('/signup',async(req,res)=>{
    const {email,password}=req.body
    const salt=bcrypt.genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    try {
        const signUp=await pool.query(`INSERT INTO users (email,hashed_password) values($1,$2)`,
    [email,hashedPassword])

    const token=jwt.sign({email},'secret',{expiresIn:'1hr'})
    res.json({email,token})
        
    } catch (error) {
        console.error(error)
        if(error){
            res.json({detail:error.detail})
        }
    }
})


//login
app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    try {
        const users=await pool.query('select * from users where email=$1',[email])
        if(!users.rows.length) return res.json({detail:'user dont exist'})
        const success=await bcrypt.compare(password,users.rows[0].hashed_password);
        console.log(users.rows[0])
        const token=jwt.sign({email},'secret',{expiresIn:'1hr'})
        
        if(success){
            res.json({'email':users.rows[0].email,token})
        }else{
            res.json({detail:'login failed'});
        }
    } catch (error) {
        console.error(error)
    }
})

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})





























































































