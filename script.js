// script.js - Main JavaScript functionality for savings app

// Console logging example
console.log('Savings app initialized');

// Web Worker initialization
if (window.Worker) {
    const worker = new Worker('worker.js');
    worker.onmessage = function(e) {
        console.log('Message from worker: ', e.data);
    };
    // Send data to worker
    worker.postMessage('Hello, worker!');
}

// Transaction management
class Transaction {
    constructor(amount, type) {
        this.amount = amount;
        this.type = type;
        this.date = new Date().toISOString();
    }
}

class TransactionManager {
    constructor() {
        this.transactions = this.loadTransactions();
    }

    addTransaction(amount, type) {
        const transaction = new Transaction(amount, type);
        this.transactions.push(transaction);
        this.saveTransactions();
        console.log('Transaction added:', transaction);
    }

    loadTransactions() {
        const transactions = localStorage.getItem('transactions');
        return transactions ? JSON.parse(transactions) : [];
    }

    saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(this.transactions));
    }
}

const transactionManager = new TransactionManager();

// Example usage
transactionManager.addTransaction(100, 'deposit');
transactionManager.addTransaction(50, 'withdrawal');
