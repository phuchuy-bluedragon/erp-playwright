import { ReturnRawFabricData } from '../../../pages/part_2.1/RawFabricManagement/ReturnRawFabricPage';

// Định nghĩa mảng dữ liệu đầu vào (chỉ nhập những gì cần điền trên UI)
const rawInputs: ReturnRawFabricData[] = [
    {
        fabricPartFilter: '몸판',
        fabricNameSearch: 'Vải Cotton Poly 01',
        returnDate: '2026-04-05',
        collectionCategory: '편직공장',
        collectionCompany: 'Knitting 3',
        returnSection: 5,
        returnQuantity: 50,
        returnQuantityUnit: 'KG',
        returnUnitPrice: 5000,
        returnVat: '반영',
        returnRemarks: 'Trả hàng lỗi sản xuất - Case 1'
    },
    {
        fabricPartFilter: '스와치',
        fabricNameSearch: 'Cora Ellis',
        returnDate: '2026-04-06',
        collectionCategory: '원사업체',
        collectionCompany: 'VA yarn',
        returnSection: 2,
        returnQuantity: 20,
        returnQuantityUnit: 'YD',
        returnUnitPrice: 7500,
        returnVat: '무시',
        returnRemarks: 'Trả hàng mẫu không đạt yêu cầu - Case 2'
    }
];

// Tự động tính toán các giá trị expected dựa trên công thức ERP
export const returnRawFabricTestData: ReturnRawFabricData[] = rawInputs.map(item => {
    const supplyValue = (item.returnQuantity || 0) * (item.returnUnitPrice || 0);
    const vatAmount = item.returnVat === '반영' ? Math.floor(supplyValue * 0.1) : 0;
    
    return {
        ...item,
        expectedSupplyValue: supplyValue,
        expectedTotal: supplyValue + vatAmount
    };
});