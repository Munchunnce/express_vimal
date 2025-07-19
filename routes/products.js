const router = require('express').Router();
let products = require('../productData');

router.get('/products', (req, res) => {
    res.render('products', {
        title: 'My Products page'
    });
});

router.get('/api/products', (req, res) => {
    res.json(products);
});

router.post('/api/products', (req, res) => {
    const { name, price } = req.body;
    if(!name || !price){
        return res.status(422).json({ error: 'All feilds are required.'});
    }

    const product = {
        name,
        price,
        id: new Date().getTime().toString()
    };

    products.push(product);
    res.json(product);
});

router.put('/api/products/:productId', (req, res) => {
  const { productId } = req.params;
  const { name, price } = req.body;

  let product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (name) product.name = name;
  if (price) product.price = price;

  res.json({ status: 'updated', product });
});


router.delete('/api/products/:productId', (req, res) => {
    products = products.filter((product) => req.params.productId !== product.id);
    res.json({ status: 'ok' });
});

module.exports = router;