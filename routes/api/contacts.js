const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const Joi = require('joi'); // Importuj moduł Joi do walidacji danych

// Importuj funkcję do generowania unikalnych identyfikatorów (przykładowa implementacja)
function generateUniqueId() {
  // Implementacja generowania unikalnego identyfikatora
  // Możesz wykorzystać na przykład bibliotekę uuid lub inny sposób, który uważasz za odpowiedni.
  return 'generated-id'; // Przykład: zwracam stałą wartość "generated-id" dla uproszczenia
}

// Importuj funkcję do dodawania kontaktu (zakładam, że masz tę funkcję zaimplementowaną)
const { addContact } = require('./contacts'); // Zastąp ścieżkę i funkcję odpowiednią do swojej implementacji

// Konfiguracja middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

// Definiuj endpointy i obsługę

// GET /api/contacts
app.get('/api/contacts', async (req, res) => {
  try {
    // Implementacja obsługi GET /api/contacts
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/contacts/:id
app.get('/api/contacts/:id', async (req, res) => {
  try {
    // Implementacja obsługi GET /api/contacts/:id
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/contacts
app.post('/api/contacts', async (req, res) => {
  const { name, email, phone } = req.body;

  // Walidacja danych wejściowych przy użyciu Joi
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
      id: generateUniqueId(), // Wygeneruj unikalny identyfikator
      name,
      email,
      phone,
    };

    // Dodaj nowy kontakt do bazy danych lub pliku
    await addContact(newContact);

    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/contacts/:id
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    // Implementacja obsługi DELETE /api/contacts/:id
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/contacts/:id
app.put('/api/contacts/:id', async (req, res) => {
  try {
    // Implementacja obsługi PUT /api/contacts/:id
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Rozpoczęcie nasłuchiwania na określonym porcie
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
