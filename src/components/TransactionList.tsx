
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const formatNaira = (amount: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  }).format(amount);
};

interface Transaction {
  id: string;
  title: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  transaction_date: string;
  transaction_categories?: {
    name: string;
    color: string;
  };
}

interface TransactionListProps {
  transactions: Transaction[];
}

export const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteMutation.mutate(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No transactions found. Add your first transaction to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-gray-900">{transaction.title}</h3>
                {transaction.description && (
                  <p className="text-sm text-gray-600 mt-1">{transaction.description}</p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                    {transaction.type}
                  </Badge>
                  {transaction.transaction_categories && (
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: transaction.transaction_categories.color,
                        color: transaction.transaction_categories.color 
                      }}
                    >
                      {transaction.transaction_categories.name}
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">
                    {new Date(transaction.transaction_date).toLocaleDateString('en-NG')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className={`text-lg font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
              {transaction.type === 'expense' ? '-' : '+'}{formatNaira(transaction.amount)}
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleDelete(transaction.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
