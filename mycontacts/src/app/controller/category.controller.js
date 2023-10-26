const categoriesRepository = require('../repository/category.repository');

class CategoryController {
  async index(request, response) {
    const categories = await categoriesRepository.findAll();
    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }
    const category = await categoriesRepository.create({ name });

    return response.status(201).json(category);
  }
}

module.exports = new CategoryController();
