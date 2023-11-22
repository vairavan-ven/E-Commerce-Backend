const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Products through the ProductTag join table
    const tags = await Tag.findAll({
      include: [{ model: Product, through: { model: ProductTag } }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its `id` and include associated Products
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: { model: ProductTag } }],
    });
    if (tag) {
      res.status(200).json(tag);
    } else {
      res.status(404).json('Tag not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new tag
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name by its `id` value
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.update({ name: req.body.name }); // Update only the name property
      res.status(200).json(tag);
    } else {
      res.status(404).json('Tag not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag by its `id` value
    const tag = await Tag.findByPk(req.params.id);
    if (tag) {
      await tag.destroy();
      res.status(204).send(); // No content response
    } else {
      res.status(404).json('Tag not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
