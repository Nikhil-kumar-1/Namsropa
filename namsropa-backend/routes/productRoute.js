const express = require('express');
const router = express.Router();
const {
  getAllDresses,
  getDressById,
  createDress,
  updateDress,
  deleteDress,
  getFeaturedDresses,
  getTrendingDresses,
  getDressesByCategory,
  searchDresses,
  getCategories
} = require('../controller/productController');

// GET /api/dresses - Get all dresses with optional filtering
router.get('/', getAllDresses);

// GET /api/dresses/featured - Get featured dresses
router.get('/featured', getFeaturedDresses);

// GET /api/dresses/trending - Get trending dresses
router.get('/trending', getTrendingDresses);

// GET /api/dresses/search - Search dresses
router.get('/search', searchDresses);

// GET /api/dresses/category/:category - Get dresses by category
router.get('/category/:category', getDressesByCategory);
//unique category
router.get("/categories", getCategories);

// GET /api/dresses/:id - Get single dress by ID
router.get('/:id', getDressById);

// POST /api/dresses - Create new dress
router.post('/', createDress);

// PUT /api/dresses/:id - Update dress
router.put('/:id', updateDress);

// DELETE /api/dresses/:id - Delete dress
router.delete('/:id', deleteDress);

module.exports = router;