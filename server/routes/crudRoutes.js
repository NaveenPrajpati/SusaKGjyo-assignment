import express from 'express'
import { Router } from 'express';
import {  addData, deleteData, getAllData, updateData,  } from '../controllers/crudController.js';
// const routes = new Router();
const routes=express.Router()
// Add routes
routes.get('/get', getAllData);
routes.post('/add',addData) 
routes.put('/update/:uniq_id',updateData);
routes.delete('/delete/:uniq_id',deleteData)

export default routes;
