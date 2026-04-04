import { SalesItemData } from '../../../pages/SalesManagement/CreateSalesPage';

export const salesTestData: SalesItemData[] = [
    {
        orderDate: '2026-03-23',
        fabricName: '품목명',
        unitType: 'section',
        sectionCount: 2,
        sectionQuantities: [50, 60],
        unitPrice: 15000,
        deliveryTarget: 'first',
        deliveryDestination: 'Kho chính Seoul',
        contact: '010-1111-2222',
        deliveryAddress: {
            keyword: '서울특별시 강남구 테헤란로 152',
            detail: 'Tầng 15'
        },
        styleNo: 'STYLE-SEC-001',
        remarks: 'Test trường hợp nhập theo 절 수'
    },
    {
        orderDate: '2026-03-24',
        fabricName: '품목명',
        unitType: 'quantity',
        saleQuantity: 500,
        unitPrice: 12000,
        deliveryTarget: 'first',
        deliveryDestination: 'Cửa hàng chi nhánh Busan',
        contact: '010-3333-4444',
        deliveryAddress: {
            keyword: '서울특별시 강남구 테헤란로 152',
            detail: 'Căn hộ A'
        },
        styleNo: 'STYLE-QTY-999',
        remarks: 'Test trường hợp nhập theo 판매량'
    }
];