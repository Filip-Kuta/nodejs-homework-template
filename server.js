const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi'); 


function generateUniqueId() {
  
  return 'generated-id'; 
}


const { addContact, getContactById, listContacts, removeContact, updateContact } = require('./models/contacts'); 


app.use(express.json());
app.use(morgan('dev'));
app.use(cors());




app.get('/api/contacts', async (req, res) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.get('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate({ name, email, phone });

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const newContact = {
      id: generateUniqueId(), 
      name,
      email,
      phone,
    };

    
    await addContact(newContact);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await removeContact(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    
    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    });

    const { error } = schema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const updatedContact = await updateContact(id, { name, email, phone });
    if (!updatedContact) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
