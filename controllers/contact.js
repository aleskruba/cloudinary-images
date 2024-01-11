const Contact = require("../models/contact");
const cloudinary = require("../utils/cloudinary");
const fs = require('fs')


const getAllContacts = async (req,res) =>{
    const contacts = await Contact.find({}).exec();
    res.status(200).json(contacts)

}

const addContact = async (req,res) =>{
    try {
        const {path} = req.file
        const result = await cloudinary.uploader.upload(path) 
        const contact = new Contact({
            name: req.body.name,
            image:result.secure_url,
            cloudinary_id:result.public_id
        })
        await contact.save()
        fs.unlinkSync(path)
        res.status(201).json(contact)
    }
        catch(err){
            console.log(err)
        }
    }

const editContact = async (req,res) =>{
    let contact = await Contact.findById(req.params.id).exec()

    await cloudinary.uploader.destroy(contact.cloudinary_id)
    let result;
    if(req.file){
        result = await cloudinary.uploader.upload(req.file.path);
     }
     const data = {
        name:req.body.name || contact.name,
        image:result?.secure_url|| contact.image,
        cloudinary_id:result?.public_id || contact.cloudinary_id,
       }
    contact = await Contact.findByIdAndUpdate(req.params.id,data,{new:true})
       if (req.file){
        fs.unlinkSync(req.file.path)
       }
       res.status(200).json(contact)

    }
    

const getContact = async (req,res) =>{
    const contact = await Contact.findById(req.params.id)
    res.status(200).json(contact)
}

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.deleteOne({ _id: req.params.id });

        if (contact.deletedCount === 1) {
            res.status(200).json({ message: 'Contact deleted successfully' });
        } else {
            res.status(404).json({ message: 'Contact not found' });
        }
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


module.exports = {
    getAllContacts,editContact,addContact,getContact,deleteContact
}