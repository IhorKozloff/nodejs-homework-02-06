const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {

  // const {error} = schemas.addSchema.validate(req.body)

  // if (error){
  //   throw createError(400, `Bad Request: ${error}`);
  // }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
}

module.exports = addContact;