export interface IncomeRequest {
    userId?: number; // ? optional
    incomeGroupId: number;
    amount: number;
    date: string;
}
