const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


function errorHandler(res){
  return err => {
    console.log(err)
    res.status(500).json({
      error: "you have found an error, please try again soon."
    })
  }
}

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
      // be sure to include its associated Product data
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
        }
      ]
    }).then((tagsData) => {
      res.json(tagsData);
    })
    .catch(errorHandler(res));
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
    // be sure to include its associated Product data
    include: [
      { model: Product }
    ]
  }).then(tagData => res.json(tagData))
  .catch(errorHandler(res));
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then(newTag => {
    res.json(newTag)
  }).catch(errorHandler(res));
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    }, { where: {
        id: req.params.id,
      }
    })
    res.json(updatedTag)
  }catch(err){
    errorHandler(res)(err);
}
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleted = await Tag.destroy({
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
