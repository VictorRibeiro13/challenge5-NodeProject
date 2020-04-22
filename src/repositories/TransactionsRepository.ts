/* eslint-disable no-param-reassign */
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (accumulated, transaction) => {
        switch (transaction.type) {
          case 'income':
            accumulated.income += transaction.value;
            break;
          case 'outcome':
            accumulated.outcome += transaction.value;
            break;
          default:
            break;
        }
        return accumulated;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const newTransaction = new Transaction({
      title,
      value,
      type,
    });

    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
