import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import ExpenseForm from './ExpenseForm';
import { useGlobalContext } from '../../context/globalContext';
import IncomeItem from '../IncomeItem/IncomeItem';
import { rupees } from '../../utils/Icons';

function Expences() {
    const {addIncome , expenses , getExpenses ,deleteExpense, totalExpense} = useGlobalContext();

    useEffect(() => {
        getExpenses();
    }, [])

  return (
    

    <ExpenseStyled>
        <InnerLayout>
            <h1>
               Expenses
            </h1>
            <h2 className='total-income'>Total Expense : <span>{rupees} {totalExpense()}</span></h2>
            <div className='income-content'>

                <div className='form-container'>
                    <ExpenseForm/>
                </div>
                <div className='incomes'>
                    {expenses.map((expense) => {
                        const {_id , title , amount , date , category , description} = expense;
                        return <IncomeItem
                            key={_id}
                            id = {_id}
                            title={title}
                            amount={amount}
                            date={date}
                            category={category}
                            description={description}
                            indicatorColor="red"
                            type='expense'
                            deleteItem={deleteExpense}
                        />
                    })}
                </div>
            </div>
        </InnerLayout>
    </ExpenseStyled>
  )
}

const ExpenseStyled = styled.div`
    display: flex;
    overflow: auto;
    .total-income{
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        border-radius: 20px;
        padding: 1rem;
        margin: 1rem 0;
        font-size: 2rem;
        gap: .5rem;
        span{
            font-size: 2.5rem;
            font-weight: 800;
            --color-red: red;
            color: var(--color-red);
        }
    }
    .income-content{
        display: flex;
        gap: 2rem;
        .incomes{
            flex: 1;
        }
    }
`;

export default Expences