const Router = require('express');
const contactController = require('./app/controller/contact.controller');
const categoryController = require('./app/controller/category.controller');

const router = Router();

// contacts
router.get('/contacts', contactController.index);

router.get('/contacts/:id', contactController.show);

router.delete('/contacts/:id', contactController.delete);

router.post('/contacts', contactController.store);

router.put('/contacts/:id', contactController.update);

// categories
router.get('/categories', categoryController.index);

router.post('/categories', categoryController.store);

module.exports = router;
