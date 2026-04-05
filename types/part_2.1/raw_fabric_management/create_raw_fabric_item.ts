import { RawFabricItemData } from '../../../pages/part_2.1/RawFabricManagement/CreateRawFabricPage';

// Định nghĩa mảng dữ liệu đầu vào (chỉ nhập những gì cần điền trên UI)
const rawInputs: RawFabricItemData[] = [
    {
        fabricPartFilter: '몸판',
        fabricNameSearch: 'Vải Cotton Poly 01',
        receivingDate: '2026-04-05',
        category: '생산',
        section: 10,
        quantity: 100,
        unitPrice: 5000,
        vat: '반영',
        processingCategory: '염색공장',
        processingCompany: 'Kelsie Bush',
        remarks: 'Tạo item 생산 - Case 1'
    },
    {
        fabricPartFilter: '스와치',
        fabricNameSearch: 'Cora Ellis',
        receivingDate: '2026-04-06',
        category: '구매',
        section: 5,
        quantity: 50,
        unitPrice: 7500,
        vat: '무시',
        processingCategory: '가공공장',
        processingCompany: '업체명1',
        remarks: 'Tạo item 구매 - Case 2'
    },
    {
        fabricPartFilter: '몸판',
        fabricNameSearch: 'Vải Silk Special',
        receivingDate: '2026-04-07',
        category: '판매',
        section: 12,
        quantity: 120,
        unitPrice: 12000,
        vat: '반영',
        processingCategory: '염색공장',
        processingCompany: 'Kelsie Bush',
        remarks: 'Tạo item 판매 - Case 3'
    }
];

// Tự động tính toán các giá trị expected dựa trên công thức ERP
export const rawFabricTestData: RawFabricItemData[] = rawInputs.map(item => {
    const supplyValue = (item.quantity || 0) * (item.unitPrice || 0);
    const vatAmount = item.vat === '반영' ? Math.floor(supplyValue * 0.1) : 0;
    
    return {
        ...item,
        expectedSupplyValue: supplyValue,
        expectedTotal: supplyValue + vatAmount
    };
});