import { YarnReturnData } from '../../../pages/part_2.1/YarnManagement/ReturnYarnPage';

export const yarnReturnTestData: YarnReturnData[] = [
    {
        searchYarnName: '20260130 _ 105618_1',
        returnDate: '2026-03-25',
        collectionCategory: '원사업체',
        collectionCompany: '20260212 _ 180423_1',
        returnQuantity: 50,
        returnQuantityUnit: '고리',
        returnUnitPrice: 4800,
        returnUnitPriceUnit: '원',
        returnVat: '반영',
        returnRemarks: 'Hàng lỗi kỹ thuật - Case 1'
    },
    {
        searchYarnName: '20260130 _ 105618_1',
        returnDate: '2026-03-26',
        collectionCategory: '원사업체',
        collectionCompany: '20260212 _ 180423_1',
        returnQuantity: 25,
        returnQuantityUnit: 'kg',
        returnUnitPrice: 5000,
        returnUnitPriceUnit: '파운드',
        returnVat: '포함',
        returnRemarks: 'Trả hàng dư - Case 2'
    }
];