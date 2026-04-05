import { YarnInvoiceData } from '../../../pages/part_2.1/YarnManagement/CreateYarnPage';

export const yarnTestData: YarnInvoiceData[] = [
    {
        date: '2026-03-22',
        yarnName: '20260130 _ 105618_1',
        receiverCategory: '원사업체',
        receiverCompany: '20260212 _ 180423_1',
        quantity: 100,
        quantityUnit: '고리',
        price: 5000,
        priceUnit: '원',
        vat: '반영',
        remarks: 'Auto Test Case 1'
    },
    {
        date: '2026-03-23',
        yarnName: '20260130 _ 105618_1',
        receiverCategory: '원사업체',
        receiverCompany: '20260212 _ 180423_1',
        quantity: 250,
        quantityUnit: 'KG',
        price: 4500,
        priceUnit: '파운드',
        vat: '포함',
        remarks: 'Auto Test Case 2 - Khác đơn vị và VAT'
    }
];