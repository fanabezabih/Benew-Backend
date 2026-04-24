const express = require('express');
const router = express.Router();

const {
  addContribution,
  getRegistryContributions,
  getTotalContribution
} = require('../controllers/contribution.controller');


// Add contribution
router.post('/add', addContribution);

// Get all contributions for registry
router.get('/:registryId', getRegistryContributions);

// Get total money raised
router.get('/total/:registryId', getTotalContribution);

module.exports = router;