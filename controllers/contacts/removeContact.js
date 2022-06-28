const { Contact } = require('../../models/contact');
const { createError } = require('../../helpers');

const removeContact = async (req, res, next) => {
  
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  
  if (result === null) {
    throw createError(404);
  }
  res.json({message: "contact deleted"});
};

module.exports = removeContact;