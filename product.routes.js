const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// Personal note: Created personal for individual task
// handle get request for path /products/id/:id
router.get('/products/id/:id', (request, response) => {
    const { id } = request.params; // Access the id parameter from the URL
 
    // Find the product based on the id parameter
    const product = products.find(product => product.id === id);
 
    if (product) {
        response.json(product); // Send the product as a JSON response
    } else {
        response.status(404).json({ message: 'Product not found' }); // Send a 404 status code and message if the product is not found
    }
 });

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/productswitherror', (request, response) => {
   let err = new Error("processing error ")
   err.statusCode = 400
   throw err
});

module.exports = router;