
const ExpenceSchema = require("../models/ExpenceModel")

exports.addExpence = async(req , res) => {
    
    const {title , amount , category, description, date} = req.body;
    const income = ExpenceSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try{
        //validatation
        if(!title || !category || !description || !date){
            return res.status(400).json({message: "All feilds are Required"})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: "All feilds are Required"})
        }

        await income.save();
        res.status(200).json({message: "Expense Added"});

    } catch(e){
        res.status(500).json({message: "Server Error"});
    }
}



exports.getAllExpence = async(req , res) => {
    try{
        const incomes = await ExpenceSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes);
    }
    catch(error){
        res.status(500).json({message: "Server Error"});
    }
}

exports.deleteExpence = async(req , res) => {
    const {id} = req.params;
    ExpenceSchema.findByIdAndDelete(id)
    .then((income) => {
        res.status(200).json({message : 'Expense Deleted'})
    })
    .catch((error) => {
        res.status(500).json({message : 'Error in Delete'})

    })
}

