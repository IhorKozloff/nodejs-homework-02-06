const express = require('express')

const contacts = require('../../models/contacts')

const router = express.Router()

const Joi = require('joi');

const contactsValidateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (err) {
    res.status500({
      whatsWrong: err
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
const { contactId } = req.params;
  console.log(contactId)
  try {
    const result = await contacts.getContactById(contactId)
    if (!result) {
      const error = new Error("Not found")
      error.status = 404;
      throw error;
    }
    res.json(result)
    
  } catch (error){
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({message: message})
  }
})

router.post('/', async (req, res, next) => {

try {
  const {error} = contactsValidateSchema.validate(req.body)
  console.log(error);
  if (error){
    const newError = new Error(`${error}`)
    newError.status = 400;
    throw newError;
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);

} catch (error) {
  const {status = 500, message = "Server error"} = error;
  res.status(status).json({message: message})
}

})

router.delete('/:contactId', async (req, res, next) => {
  

  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId)

    if (!result) {
      const error = new Error("Not found")
      error.status = 404;
      throw error;
    }
    res.json({message: "contact deleted"})

  } catch (error){
    const {status = 500, message = "Server error"} = error;
    res.status(status).json({message: message})
  }
})

router.put('/:contactId', async (req, res, next) => {

  try {
    const {error} = contactsValidateSchema.validate(req.body);

    if (error){
      const newError = new Error(`${error}`);
      newError.status = 400;
      throw newError;
    }

    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      const error = new Error("Not found")
      error.status = 404;
      throw error;
    }

    res.json(result);

  } catch (error) {

    const {status = 500, message = "Server error"} = error;
    res.status(status).json({message: message});

  }
})

module.exports = router
