const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const app = express()
let operaciones = 0; 
app.use(express.json())

app.listen(3000, () => {
  console.log('Server is running on port 3000')
  //res.send('Hello World')
})
app.get('/', (req, res) => {
    res.send('Hello World api server')
});


//PRODUCTOS


//CREATE PRODUCTOS
app.post('/api/products', async(req, res) => {
  
  try{
    const product = await Product.create(req.body);
    operaciones++;
    res.status(200).json({product});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 

//GET PRODUCTOS
app.get('/api/products', async(req, res) => {
  try{
    const products = await Product.find({});
    operaciones++;
    res.status(200).json({products});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 

//UPDATE PRODUCTOS
app.put('/api/product/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    
    if(!product){
      res.status(404).json({message: "Product not found"});
    }
    const updatedProduct = await Product.findById(id);

    operaciones++;
    res.status(200).json({product: updatedProduct});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 


//DELETE PRODUCTO
app.delete('/api/product/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    const products = await Product.find({});

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    operaciones++;
    res.status(200).json({ message: "Producto eliminado correctamente" 
    , products: products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


//USUARIOS


//CREATE USUARIOS
app.post('/api/usuarios', async(req, res) => {
  
  try{
    const user = await User.create(req.body);
    operaciones++;
    res.status(200).json({user});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 

//GET USUARIOS
app.get('/api/usuarios', async(req, res) => {
  try{
    const user = await User.find({});
    operaciones++;
    res.status(200).json({user});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 

//UPDATE USUARIOS
app.put('/api/usuario/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    
    if(!user){
      res.status(404).json({message: "Usuario no encontrado"});
    }
    const updatedUser = await User.findById(id);

    operaciones++;
    res.status(200).json({product: updatedUser});
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 


//DELETE PRODUCTO
app.delete('/api/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    const users = await User.find({});
 
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    
    operaciones++;
    res.status(200).json({ message: "Usuario eliminado correctamente" 
    , users: users
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


//CONTADORES
//GET CONTADORES
app.get('/api/contadores', async(req, res) => {
  try{
    const totalProductos = await Product.countDocuments();
    const totalUsuarios = await User.countDocuments();
    
    operaciones++;
    res.status(200).json({
      "Total de productos": totalProductos,
      "Total de usuarios": totalUsuarios
    });
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 


//OPERACIONES
app.get('/api/operaciones', async(req, res) => {
  try{
    res.status(200).json({
      "Total de operaciones exitosas": operaciones,
    });
  }catch(error){
      console.log(error);
      res.status(500).json({message: error.message});
  }
}); 
//DATABASE CONNECTION
mongoose.connect("mongodb+srv://ivonnecolque:ivonnecolque@backenddb.y4jvk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB")
.then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection failed!");
});

//app.listen(3000)