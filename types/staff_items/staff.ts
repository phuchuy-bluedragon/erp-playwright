import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface StaffItemData {
    staffName: string;
    email: string;
    personalPhoneNumber: string;
    password: string;
    workPhoneNumber: string;
    employmentStatus: string;
    hireDate: string;
    terminationDate: string;
    team: string;
    position: string;
    contractType: string;
    roleGroup: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
}

// Bộ dữ liệu mẫu
export const staffTestData: StaffItemData[] = [
    {
        staffName: `${nowFmt}_1`,
        email: `${Math.random().toString(36).slice(2, 7)}@gmail.com`,
        personalPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        password: 'test12345',
        workPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        employmentStatus: '퇴사',
        hireDate: new Date(2019 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10),
        terminationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10),
        team: '경리팀',
        position: '회장',
        contractType: '프리랜서',
        roleGroup: '대표',
        bankName: 'KB국민은행',
        accountNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(1000 + Math.random() * 9000)}${Math.floor(100000 + Math.random() * 900000)}`,
        accountHolder: `One ${Math.random().toString(36).slice(2, 6)}`,
    },
    {
        staffName: `${nowFmt}_2`,
        email: `${Math.random().toString(36).slice(2, 7)}@gmail.com`,
        personalPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        password: 'test12345',
        workPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        employmentStatus: '재직',
        hireDate: new Date(2019 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10),
        terminationDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().slice(0, 10),
        team: '영업팀',
        position: '인턴',
        contractType: '정규직',
        roleGroup: '대표',
        bankName: '수협은행',
        accountNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(1000 + Math.random() * 9000)}${Math.floor(100000 + Math.random() * 900000)}`,
        accountHolder: `Two ${Math.random().toString(36).slice(2, 6)}`,
    },
];