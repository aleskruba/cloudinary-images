const express = require('express');
const { getAllContacts,addContact,editContact,getContact,deleteContact } = require('../controllers/contact');
const router = express.Router()
const upload = require('../middlewares/multer');

router.get('/', getAllContacts);
router.post('/add',upload.single('image'),  addContact);
router.put('/:id',upload.single('image'), editContact);
router.get('/:id', getContact);
router.delete('/:id', deleteContact);


module.exports = router