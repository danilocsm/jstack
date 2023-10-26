const contactRepository = require('../repository/contact.repository');

class ContactController {
  async index(request, response) {
    const { orderBy } = request.query;
    const allContacts = await contactRepository.findAll(orderBy);
    response.status(200).json(allContacts);
  }

  async show(request, response) {
    const { id } = request.params;

    const contact = await contactRepository.findById(id);

    if (!contact) return response.status(404).json({ err: 'User not found' });

    return response.status(200).json(contact);
  }

  async store(request, response) {
    const {
      name, email, phone, category_id,
    } = request.body;

    if (!name) { return response.status(400).json({ err: 'Name is required' }); }

    const contactExists = await contactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ err: 'Email already exists' });
    }

    const created = await contactRepository.create({
      name, email, phone, category_id,
    });
    return response.status(201).json(created);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    const contactExists = await contactRepository.findById(id);

    if (!contactExists) { return response.status(404).json({ err: 'User not found' }); }

    const contactByEmail = await contactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) { return response.status(400).json({ err: 'Email is already in use' }); }

    const updated = await contactRepository.update(id, {
      name, email, phone, category_id,
    });
    return response.status(200).json(updated);
  }

  async delete(request, response) {
    const { id } = request.params;

    const isDeleted = await contactRepository.deleteById(id);

    if (!isDeleted) return response.status(404).json({ err: 'User not found' });

    return response.sendStatus(204);
  }
}

module.exports = new ContactController();
