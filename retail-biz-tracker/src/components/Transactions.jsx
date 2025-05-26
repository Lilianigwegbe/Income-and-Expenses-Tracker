export default function Transactions() {
  return (
    <section className="bg-white rounded-2xl shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Recent Transactions</h3>
      <ul className="text-sm text-gray-600">
        <li className="flex justify-between border-b py-2">
          <span>📥 ₦1,000 - Sales</span>
          <span className="text-xs text-gray-400">Today</span>
        </li>
        <li className="flex justify-between border-b py-2">
          <span>📤 ₦500 - Supplies</span>
          <span className="text-xs text-gray-400">Yesterday</span>
        </li>
      </ul>
    </section>
  )
}
