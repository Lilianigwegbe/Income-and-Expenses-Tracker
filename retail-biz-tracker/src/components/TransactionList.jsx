function TransactionList({ transactions }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Transactions</h2>
      <ul>
        {transactions.map((tx) => (
          <li key={tx.id} className="border-b py-2">
            {tx.description}: ${tx.amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
