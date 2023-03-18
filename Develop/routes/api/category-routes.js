const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  const categoriesData = await Category.findAll({ include: Product });
  res.status(200).json(categoriesData);
  } catch (error) {
  res.status(500).json(error);
  }
  });
  
  router.get('/:id', async (req, res) => {
  try {
  const categoryData = await Category.findByPk(req.params.id, { include: Product });
  if (!categoryData) {
  res.status(404).json({ message: 'No category found with id: ${req.params.id}' });
  return;
  }
  res.status(200).json(categoryData);
  } catch (error) {
  res.status(500).json(error);
  }
  });
  
  router.post('/', async (req, res) => {
  try {
  const newCategory = await Category.create(req.body);
  res.status(200).json(newCategory);
  } catch (error) {
  res.status(500).json(error);
  }
  });
  
  router.put('/:id', async (req, res) => {
  try {
  const updatedCategory = await Category.update(req.body, {
  where: { id: req.params.id },
  });
  if (!updatedCategory[0]) {
  res.status(404).json({ message: 'No category found with id: ${req.params.id}' });
  return;
  }
  res.status(200).json(updatedCategory);
  } catch (error) {
  res.status(500).json(error);
  }
  });
  
  router.delete('/:id', async (req, res) => {
  try {
  const deletedCategory = await Category.destroy({ where: { id: req.params.id } });
  if (!deletedCategory) {
  res.status(404).json({ message: 'No category found with id: ${req.params.id}' });
  return;
  }
  res.status(200).json(deletedCategory);
  } catch (error) {
  res.status(500).json(error);
  }
  });

module.exports = router;
