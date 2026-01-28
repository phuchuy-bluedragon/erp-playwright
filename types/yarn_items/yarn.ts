import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface YarnItemData {
    yarnPart: string;
    itemName: string;
    itemColor: string;
    remarks: string;
}

// Bộ dữ liệu mẫu
export const yarnTestData: YarnItemData[] = [
    {
        yarnPart: '방적사',
        itemName: `${nowFmt}_1`,
        itemColor: '블랙',
        remarks: `비고_${Math.random().toString(36).substring(7)}_1`,
    },
    {
        yarnPart: '스판',
        itemName: `${nowFmt}_2`,
        itemColor: '하얀색',
        remarks: `비고_${Math.random().toString(36).substring(7)}_2`,
    },
];