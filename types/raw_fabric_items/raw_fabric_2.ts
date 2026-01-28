import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface RawFabricItemData2 {
    fabricPart: string;
    businessCategory: string;
    provider: string;
    purchaseUnit: string;
    saleUnit: string;
    isSaleEnded: string;
    purchaseItemName: string;
    saleItemName: string;
    remarks: string;
}

// Bộ dữ liệu mẫu
export const rawFabricTestData: RawFabricItemData2[] = [

    {
        fabricPart: '몸판',
        businessCategory: '원사업체',
        provider: 'Reese Moody',
        purchaseUnit: 'KG',
        saleUnit: 'YD',
        isSaleEnded: 'N',
        purchaseItemName: `${nowFmt}_1`,
        saleItemName: `${nowFmt}_1.5`,
        remarks: `비고_${Math.random().toString(36).substring(7)}_1`,
    },
    {
        fabricPart: '스와치',
        businessCategory: '가공공장',
        provider: '업체명1',
        purchaseUnit: 'YD',
        saleUnit: 'EA',
        isSaleEnded: 'N',
        purchaseItemName: `${nowFmt}_2`,
        saleItemName: `${nowFmt}_2.5`,
        remarks: `비고_${Math.random().toString(36).substring(7)}_2`,
    }
];