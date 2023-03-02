const path = require("path");
const fs = require("fs/promises");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "/contacts.json");

const allContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await allContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const remove = async (contactId) => {
  const contacts = await allContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== idx);
  await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  return contacts[idx];
};

const add = async (data) => {
  const contacts = await allContacts();
  const newContact = { id: v4(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const update = async (contactId, body) => {
  const contacts = await allContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  allContacts,
  getContactById,
  remove,
  add,
  update
};
