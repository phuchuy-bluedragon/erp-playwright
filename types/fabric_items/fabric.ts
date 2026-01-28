import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface FabricItemData {
    printDesign: string;
    color: string;
    btNo: string;
    prodStandard: string;
    prodPrice: string;
    prodUnit: string;
    saleUnit: string;
    isProdStopped: string;
    allowedLossRate: string;
    remarks: string;
}

// Bộ dữ liệu mẫu
export const fabricTestData: FabricItemData[] = [

    {
        printDesign: `${nowFmt}_1`,
        color: `${nowFmt}_1.1`,
        btNo: `${nowFmt}_1.2`,
        prodStandard: '생지중량',
        prodPrice: `${Math.floor(Math.random() * 99001) + 1000}`,
        prodUnit: 'KG',
        saleUnit: 'YD',
        isProdStopped: 'N',
        allowedLossRate: '12.7',
        remarks: `비고_${Math.random().toString(36).substring(7)}_1.3`
    },
    {
        printDesign: `${nowFmt}_2`,
        color: `${nowFmt}_2.1`,
        btNo: `${nowFmt}_2.2`,
        prodStandard: '가공중량',
        prodPrice: `${Math.floor(Math.random() * 99001) + 1000}`,
        prodUnit: 'YD',
        saleUnit: 'EA',
        isProdStopped: 'Y',
        allowedLossRate: '85.9',
        remarks: `비고_${Math.random().toString(36).substring(7)}_2.3`
    },
];