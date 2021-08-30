const { Router } = require('express');
// const RecipeRoutes = require('./recipe')
// const DietRoutes = require('./diet')
const Warehouse = require('./deposito.js');

const router = Router();

// router.use('/');

router.use('/warehouse' ,Warehouse)
// router.use('/types',DietRoutes);
// router.use('/recipe',RecipeRoutes);


module.exports = router;