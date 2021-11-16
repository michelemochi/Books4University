"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _expressAsyncHandler = _interopRequireDefault(require("express-async-handler"));

var _productModel = _interopRequireDefault(require("../models/productModel"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productRouter = _express.default.Router();

productRouter.get('/', (0, _expressAsyncHandler.default)(async (req, res) => {
  const searchKeyword = req.query.searchKeyword ? {
    name: {
      $regex: req.query.searchKeyword,
      $options: 'i'
    }
  } : {};
  const products = await _productModel.default.find({ ...searchKeyword
  });
  res.send(products);
}));
productRouter.get('/:id', (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);
  res.send(product);
}));
productRouter.post('/', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = new _productModel.default({
    name: 'sample product',
    description: 'sample desc',
    category: 'sample category',
    image: '/images/fisica1.jpg'
  });
  const createdProduct = await product.save();

  if (createdProduct) {
    res.status(201).send({
      message: 'Product Created',
      product: createdProduct
    });
  } else {
    res.status(500).send({
      message: 'Error in creating product'
    });
  }
}));
productRouter.put('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const productId = req.params.id;
  const product = await _productModel.default.findById(productId);

  if (product) {
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.image = req.body.image;
    product.original_price = req.body.original_price;
    product.price = req.body.price;
    product.countInStock = req.body.countInStock;
    const updatedProduct = await product.save();

    if (updatedProduct) {
      res.send({
        message: 'Prodotto aggiornato',
        product: updatedProduct
      });
    } else {
      res.status(500).send({
        message: `Errore nell'aggiornamento del prodotto`
      });
    }
  } else {
    res.status(404).send({
      message: 'Not Found'
    });
  }
}));
productRouter.delete('/:id', _utils.isAuth, _utils.isAdmin, (0, _expressAsyncHandler.default)(async (req, res) => {
  const product = await _productModel.default.findById(req.params.id);

  if (product) {
    const deletedProduct = await product.remove();
    res.send({
      message: 'Prodotto Eliminato',
      product: deletedProduct
    });
  } else {
    res.status(404).send({
      message: 'Not Found'
    });
  }
}));
var _default = productRouter;
exports.default = _default;