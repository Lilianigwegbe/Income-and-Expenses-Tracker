export default function QuickAdd() {
  return (
    <section className="flex gap-4 mb-6">
      <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600">
        + Add Income
      </button>
      <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-xl hover:bg-red-600">
        + Add Expense
      </button>
    </section>
  )
}
