const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const editContact = require('./editContact');
const removeContact = require('./removeContact');
const updateStatusContact = require('./updateStatusContact');

module.exports = {
    listContacts,
    getContactById,
    addContact,
    editContact,
    removeContact,
    updateStatusContact,
}