import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAuth, isAdmin } from '../utils';


const productRouter = express.Router();
productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const searchKeyword = req.query.searchKeyword
        ? {
            name: {
              $regex: req.query.searchKeyword,
              $options: 'i',
            },
          }
        : {};
      const products = await Product.find({ ...searchKeyword });
      res.send(products);
    })
  );
productRouter.get(
    '/:id', 
    expressAsyncHandler(async (req, res) => { 
    const product = await Product.findById(req.params.id);
    res.send(product);    
    })
);

productRouter.post(
    '/', 
    isAuth, 
    isAdmin, 
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name:'sample product',
            description:'sample desc',
            category:'sample category',
            image:'/images/fisica1.jpg',
        });
        const createdProduct = await product.save();
        if (createdProduct) {
            res
            .status(201)
            .send({message:'Product Created', product: createdProduct});
        } else {
            res.status(500).send({ message: 'Error in creating product' });
        }
    })
);
productRouter.put(
    '/:id', 
    isAuth, 
    isAdmin, 
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product) {
            product.name = req.body.name;
            product.description = req.body.description;
            product.category = req.body.category;
            product.image = req.body.image;
            product.original_price = req.body.original_price;
            product.price = req.body.price;
            product.countInStock = req.body.countInStock;
            const updatedProduct = await product.save();
            if (updatedProduct) {
                res.send({message: 'Prodotto aggiornato', product: updatedProduct });
            } else {
                res.status(500).send({ message: `Errore nell'aggiornamento del prodotto`});
            }
        } else {
            res.status(404).send({ message: 'Not Found' });
        }
    })
);
productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        const deletedProduct = await product.remove();
        res.send({ message: 'Prodotto Eliminato', product: deletedProduct });
      } else {
        res.status(404).send({ message: 'Not Found' });
      }
    })
  );
export default productRouter;