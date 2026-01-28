import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface YarnComposition {
    ratio: string;
    loss: string;
}

export interface RawFabricItemData1 {
    fabricPart: string;
    businessCategory: string;
    provider: string;
    prodUnit: string;
    saleUnit: string;
    isSaleEnded: string;
    itemName: string;
    remarks: string;
    yarns: YarnComposition[];
}

// Bộ dữ liệu mẫu
export const rawFabricTestData: RawFabricItemData1[] = [

    {
        fabricPart: '몸판',
        businessCategory: '원사업체',
        provider: 'Reese Moody',
        prodUnit: 'KG',
        saleUnit: 'YD',
        isSaleEnded: 'N',
        itemName: `${nowFmt}_1`,
        remarks: `비고_${Math.random().toString(36).substring(7)}_1`,
        yarns: [
            { ratio: '56', loss: '4' },
            { ratio: '26', loss: '13.6' },
        ]
    },
    {
        fabricPart: '스와치',
        businessCategory: '가공공장',
        provider: '업체명1',
        prodUnit: 'YD',
        saleUnit: 'EA',
        isSaleEnded: 'N',
        itemName: `${nowFmt}_2`,
        remarks: `비고_${Math.random().toString(36).substring(7)}_2`,
        yarns: [
            { ratio: '0', loss: '4.8' },
            { ratio: '12', loss: '13.6' },
        ]
    }
];