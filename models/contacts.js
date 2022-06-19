const fs = require('fs/promises')
const path = require("path");
const createId = require('./utils/idGenerator');

const contactsPath = path.join(__dirname, "contacts.json");

async function uptateContacts (data) {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2))
}


const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find(item => item.id === contactId);
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContactIndex = contacts.findIndex(item => item.id === contactId)

  if (deletedContactIndex === -1) {
    return null
  }

  const [deletedContact] = contacts.splice(deletedContactIndex, 1);

  uptateContacts(contacts)
  return deletedContact
}


const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();

  const newContact = {
    id: createId(contacts),
    name,
    email, 
    phone
  }
  contacts.push(newContact);
  uptateContacts(contacts);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const {name, email, phone} = body;
  const contacts = await listContacts();

  const currentContactIndex = contacts.findIndex(item => item.id === contactId);

  if (currentContactIndex === -1){
    return null;
  }
  contacts[currentContactIndex] = {id: contactId, name, email, phone};
  uptateContacts(contacts);
  return contacts[currentContactIndex]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
