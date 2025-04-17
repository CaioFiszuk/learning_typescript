const router = require('express').Router();
const { createUser, getAllUsers, deleteUser, updateUser } = require('../controllers/users');

router.post('/', createUser);
router.get('/', getAllUsers);
router.patch('/userId', updateUser);
router.delete('/userId', deleteUser);

module.exports = router;
