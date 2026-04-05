import { PaymentData } from '../../../pages/part_2.1/YarnManagement/PaymentPage';

export interface PaymentTestData extends PaymentData {
    companyName: string;
}

export const paymentYarnTestData: PaymentTestData[] = [
    {
        companyName: '20260404 _ 164048_1',
        category: '결제',
        paymentDate: '2026-03-25',
        amount: 100000,
        remarks: 'Thanh toán - Case 1'
    },
    {
        companyName: 'KFC',
        category: '공제',
        paymentDate: '2026-03-26',
        amount: 50000,
        remarks: 'Khấu trừ - Case 2'
    }
];