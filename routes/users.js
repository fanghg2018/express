var express = require('express');
const { userModel, userInfoModel } = require('../model/user.js');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { limit, offset } = req.query
  await userModel.findAndCountAll(
    {
      limit,
      offset: limit * (offset - 1)
    }).then(data => {
      res.send(data)
    })
})

router.post('/', async (req, res, next) => {
  const { username, status, password } = req.body
  await userModel.create({
    username, status, password
  }).then(data => {
    res.send({ ok: 1 })
  });
});

router.put('/:id', async (req, res, next) => {
  const { username, status, password } = req.body
  await userModel.update({
    username, status, password
  }, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.send({ ok: 1 })
  });
});


router.delete('/:id', async (req, res, next) => {
  await userModel.destroy({
    where: { id: req.params.id },
  })
    .then(data => {
      res.send({ ok: 1 })
    });
});



module.exports = router;
