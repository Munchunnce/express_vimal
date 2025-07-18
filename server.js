const express = require('express');
const path = require('path');
const mainRouter = require('./routes/index');
const productsRouter = require('./routes/products');


const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(productsRouter);
app.use(mainRouter);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});