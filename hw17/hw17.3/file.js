class BankAccount {
    constructor(balance){
        this.balance = balance
    };
    getBalance(){
        return this.balance
    };
    deposit(plusToBalance){
        this.balance += plusToBalance
    };
    withdraw(reduceBalance){
        this.balance -= reduceBalance
    }
}

const account1 = new BankAccount(1000);

console.log(account1.getBalance()); // 1000

account1.deposit(500);

console.log(account1.getBalance()); // 1500

account1.withdraw(200);

console.log(account1.getBalance()); // 1300