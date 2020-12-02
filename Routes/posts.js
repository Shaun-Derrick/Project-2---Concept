const router = require('express').Router()

router.get('/', (req, res) => {
  res.json({
    posts: {
      title: 'Posts',
    },
    description: 'Some data',
  })
})

module.exports = router
