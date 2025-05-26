import { useState } from 'react'
import IncomeExpenseForm from './components/IncomeExpenseForm'
import TransactionList from './components/TransactionList'
import Header from './components/Header'
import Summary from "./components/Summary";


function App() {
  const [transactions, setTransactions] = useState([])

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction])
  }

  // Calculate totals
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0)

  const balance = income - expenses

  return (
    <div className="min-h-screen bg-gray-100 p-4 text-gray-800 max-w-xl mx-auto">
      <Header />
      <Summary income={income} expenses={expenses} balance={balance} />
      <IncomeExpenseForm onAdd={addTransaction} />
      <TransactionList transactions={transactions} />
    </div>
  )
}

export default App
