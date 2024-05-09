const express = require('express');
const ProductsService = require('../Services/products.services');
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema } = require('../schemas/products.schemas');

const router = express.Router();
const services = new ProductsService()

router.get('/', async (req, res) => {
  const products = await services.find()
  res.json(products)
});



router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params
    const products = await services.findone(id)
    res.json(products);
  } catch (error) {
    next(error);
  }
});


router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newproduct = await services.create(body)
  res.status(201).json({ newproduct })
})


router.patch('/:id',
validatorHandler(getProductSchema, 'params'),
validatorHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updatedproduct = await services.update(id, body)
    res.json({ updatedproduct })
  } catch (error) {
    next(error);
  }

})


router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await services.delete(id)
  res.json({ deleteProduct })
})

module.exports = router;
