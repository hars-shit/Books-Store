import  express  from "express";
import { PORT, mongodbUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/book.js";
import cors from 'cors';

const app=express();

// middleware for parsing request body

app.use(express.json());
app.use(cors());


app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send("Welcome")
});

// route for save a new book 

app.post('/books',async(request,response)=>{
try{
    if(
    !request.body.title ||
    !request.body.author ||
    !request.body.publishYear){
        return response.status(400).send({
            message:'send all required fields',
        })
    }
    const newBook={
        title:request.body.title,
        author:request.body.author,
        publishYear:request.body.publishYear,
    }
    const book=await Book.create(newBook);
    return response.status(201).send(book)

}catch(err){
    console.log(err.message);
    return response.status(500).send({message:err.message});

}
})

// to get all books from db

app.get('/books',async(request,response)=>{
    try{
        const books=await Book.find({});
        return response.status(200).json({
            count:books.length,
            data:books
        });

    }catch(err){
    console.log(err.message);
    return response.status(500).send({message:err.message});

}
})

// to get a book by id 

app.get('/books/:id',async (request,response)=>{
    try{
        const {id}=request.params;
        const book=await Book.findById (id);

        return response.status(200).json(book)
    }catch(err){
        console.log(err.message);
        return response.status(500).send({message:err.message});
    
    }
})

// update book 

app.put('/books/:id',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear){
                return response.status(400).send({
                    message:'send all required fields',
                })
            }

        const {id}=request.params;
        const result=await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(404).json({message:'Book not found'})
        }

        return response.status(200).send({message:"Book update successfully"})
    }catch(err){
        console.log(err.message);
        return response.status(500).send({message:err.message});
    
    }
})

// delete a book by id 

app.delete('/books/:id',async(request,response)=>{
    try{
         const {id}=request.params;
        const deleteById=await Book.findByIdAndDelete(id);
        if(!deleteById){
            return response.status(404).json({message:'Book not found'});
        }
        return response.status(200).send({message:"Deleted successfully"})

    }
    catch(err){
        console.log(err.message)
        return response.status(500).send({message:err.message});
    }
})


mongoose.connect(mongodbUrl)
.then(()=>{
    console.log('App is connected to db')
    app.listen(PORT,()=>{
        console.log(`Listening to port ${PORT}`)
    })
})
.catch((error)=>{
    console.log(error)
})