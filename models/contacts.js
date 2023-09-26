const contactsData = require('./contacts.json');

const listContacts = async () => {
  return contactsData;
}

const getContactById = async (contactId) => {
  const contact = contactsData.find((c) => c.id === contactId);
  return contact;
}

const removeContact = async (contactId) => {
  const index = contactsData.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return null; // Kontakt o podanym ID nie istnieje
  }
  const removedContact = contactsData.splice(index, 1)[0];
  return removedContact;
}

const addContact = async (body) => {
  const newContact = {
    id: Date.now().toString(), // Tworzymy unikalny ID
    ...body,
  };
  contactsData.push(newContact);
  return newContact;
}

const updateContact = async (contactId, body) => {
  const index = contactsData.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return null; // Kontakt o podanym ID nie istnieje
  }
  const updatedContact = {
    ...contactsData[index],
    ...body,
  };
  contactsData[index] = updatedContact;
  return updatedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
