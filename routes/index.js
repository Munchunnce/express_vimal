const router = require('express').Router();
const apiKeyMiddleware = require('../middleware/apiKey');

// router.use(apiKeyMiddleware);

router.get('/', (req, res) => {
    res.render('index', {
        title: 'My home page'
    });
})

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'My about page'
    });
})

router.get('/download', (req, res) => {
    res.download(path.resolve(__dirname) + '/about.html');
});

router.get('/api/download',apiKeyMiddleware, (req, res) => {
    res.json([
        {
            id: 123,
            name: 'chrome'
        },
        {
            id: 124,
            name: 'firefox'
        },
    ])
});

module.exports = router;