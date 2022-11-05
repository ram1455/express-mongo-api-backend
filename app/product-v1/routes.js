const router = require('express').Router();

const multer = require('multer');
const upload = multer({dest : 'uploads'});
const controllerV1  = require('./controller')

router.get('/product',controllerV1.index);
router.get('/product/:id', controllerV1.view);

router.post('/product', upload.single('image'),controllerV1.store);

router.delete('/product/:id', controllerV1.destroy);

router.put('/product/:id', upload.single('image'),controllerV1.update);

module.exports = router;