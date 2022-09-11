const router = require('express').Router();
const { Category, Product } = require('../../models');

// global function to handle errors
function errorHandler(res){
  return err => {
    console.log(err)
    res.status(500).json({
      error: "you have found an error, please try again soon."
    })
  }
}

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: [
      { model: Product}
    ]
  }).then((categories) => {
    res.json(categories);
  })
  .catch(errorHandler(res));
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findByPk(req.params.id, {
    // be sure to include its associated Products
    include: [
      { model: Product }
    ]
  }).then(category => res.json(category))
  .catch(errorHandler(res));
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  }).then(category => {
    res.json(category)
  })
  .catch(errorHandler(res));
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try{
    const updated = await Category.update({
      category_name: req.body.category_name,
    }, {
      where: {
        id: req.params.id,
      }
    })
    res.json(updated)
  }catch(err){
    errorHandler(res)(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleted = await Category.destroy({
      where: {
        id: req.params.id,
      }
  })
  res.json(deleted)
}catch(err){
  errorHandler(res)(err);
}
});

module.exports = router;
