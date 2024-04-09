const { addIncome, getAllIncome, deleteIncome } = require('../controllers/Income')
const { addExpence, getAllExpence, deleteExpence } = require('../controllers/expences')

const router = require('express').Router()


router.post('/add-income' , addIncome)
        .get('/get-incomes', getAllIncome)
        .delete('/delete-income/:id' , deleteIncome)
        .post('/add-expence' , addExpence)
        .get('/get-expence', getAllExpence)
        .delete('/delete-expence/:id' , deleteExpence)

module.exports = router