const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({
      include: Product,
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      include: Product,
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json('Category not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new category
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a category by its `id` value
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.update(req.body);
      res.status(200).json(category);
    } else {
      res.status(404).json('Category not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a category by its `id` value
    const category = await Category.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.status(204).send(); // No content response
    } else {
      res.status(404).json('Category not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
