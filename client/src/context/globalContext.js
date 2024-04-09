import React, { createContext, useContext, useState } from "react"
import axios from 'axios'

const BaseURL = "http://localhost:5000/api/v1/"

const GlobalContext = createContext();


export const GlobalProvider = ({children}) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses , setExpenses] = useState([]);
    const [error , setError] = useState(null);

    const addIncome = async(income) => {
        try {
            const response = await axios.post(`${BaseURL}add-income`, income)
            
        } catch (err) {
            return setError(err.response.data.message)    
        }
        getIncomes();
    }

    const getIncomes = async() => {
        try {
            const response = await axios.get(`${BaseURL}get-incomes`)
            setIncomes(response.data)
            // console.log(response.data);
            
        } catch (err) {
            return setError(err.response.data.message)    
        }
        
    }

    const deleteIncome = async(id) => {
        try {
            const res = await axios.delete(`${BaseURL}delete-income/${id}`)
        } catch (err) {
            return setError(err.response.data.message) 
        }
        getIncomes();
    }

    const totalIncome = () => {
        try {
            let totalIncome = 0;
            incomes.forEach((income) => {
                totalIncome = totalIncome + income.amount;
            })
            return totalIncome;
        } catch (err) {
            return setError(err.response.data.message) 
        }
    }
  

    const addExpense = async(expense) => {
        try {
            const response = await axios.post(`${BaseURL}add-expence`, expense)
        } catch (err) {
            return setError(err.response.data.message);
        }
        getExpenses();
    }

    const getExpenses = async() => {
        try {
            const response = await axios.get(`${BaseURL}get-expence`)
            setExpenses(response.data)
            // console.log(response.data);
            
        } catch (err) {
            return setError(err.response.data.message)    
        }
        
    }

    const deleteExpense = async(id) => {
        try {
            const res = await axios.delete(`${BaseURL}delete-expence/${id}`)
        } catch (err) {
            return setError(err.response.data.message) 
        }
        getExpenses();
    }

    const totalExpense = () => {
        try {
            let totalExpense = 0;
            expenses.forEach((expense) => {
                totalExpense = totalExpense + expense.amount;
            })
            return totalExpense;
        } catch (err) {
            return setError(err.response.data.message) 
        }
    }

    const totalBalance = () => {
         return totalIncome() - totalExpense();
    }

    const transactionHistory = () => {
        const history = [...incomes , ...expenses];
        history.sort((a , b) => { 
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history;
    }

    return (
        <GlobalContext.Provider value= {{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpense,
            expenses,
            totalBalance,
            transactionHistory
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(GlobalContext);
}