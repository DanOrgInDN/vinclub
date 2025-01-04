export interface Recharge {
    amount: number;
    accountNumber: string;
    accountName: string;
    bankName: string;
}

export interface Withdraw {
    userId: string;
    amount: number;
}
