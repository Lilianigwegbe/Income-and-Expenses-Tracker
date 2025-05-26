export default function Summary({ income, expenses, balance }) {
  return (
    <section className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Income</p>
        <h2 className="text-lg font-bold text-green-600">₦{income.toFixed(2)}</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Expenses</p>
        <h2 className="text-lg font-bold text-red-600">₦{expenses.toFixed(2)}</h2>
      </div>
      <div className="bg-white rounded-xl shadow p-4 text-center">
        <p className="text-sm text-gray-500">Balance</p>
        <h2 className="text-lg font-bold text-blue-600">₦{balance.toFixed(2)}</h2>
      </div>
    </section>
  )
}
