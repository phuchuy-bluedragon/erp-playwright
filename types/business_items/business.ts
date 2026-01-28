import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface BusinessItemData {
    businessPart: string;
    businessName: string;
    businessRegistrationNumber: string;
    phoneNumber: string;
    faxNumber: string;
    headOfficeAddress: string;
    detailedAddress: string;
    contactName: string;
    contactPosition: string;
    contactEmail: string;
    contactPhone: string;
    companyAccountManager: string;
    vatApplicable: string;
    remarks: string;
    bankName: string;
    accountHolder: string;
    accountDisplayName: string;
    accountNumber: string;
}

// Bộ dữ liệu mẫu
export const businessTestData: BusinessItemData[] = [
    {
        businessPart: '원사업체',
        businessName: `${nowFmt}_1`,
        businessRegistrationNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(10 + Math.random() * 90)}${Math.floor(10000 + Math.random() * 90000)}`,
        phoneNumber: `02-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        faxNumber: `02-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        headOfficeAddress: `서울특별시 강남구 테헤란로 ${Math.floor(1 + Math.random() * 300)}, ${Math.floor(2 + Math.random() * 20)}층`,
        detailedAddress: `${Math.floor(Math.random() * 5)}`,
        contactName: ['김민수', '이서연', '박지훈', '최유진', '정도현'][Math.floor(Math.random() * 5)],
        contactPosition: ['사원', '대리', '과장', '차장', '부장'][Math.floor(Math.random() * 5)],
        contactEmail: `user${Math.floor(Math.random() * 1000)}@example.co.kr`,
        contactPhone: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        companyAccountManager: 'Nevada Haney',
        vatApplicable: 'Y',
        remarks: `비고_${Math.random().toString(36).substring(7)}_1`,
        bankName: 'KB국민은행',
        accountHolder: `(주)${['테스트', '샘플', '가나다', '에이비씨'][Math.floor(Math.random() * 4)]}컴퍼니`,
        accountDisplayName: '법인 운영계좌',
        accountNumber: `${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(100000 + Math.random() * 900000)}`,
    },
    {
        businessPart: '가공공장',
        businessName: `${nowFmt}_2`,
        businessRegistrationNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(10 + Math.random() * 90)}${Math.floor(10000 + Math.random() * 90000)}`,
        phoneNumber: `02-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        faxNumber: `02-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        headOfficeAddress: `서울특별시 강남구 테헤란로 ${Math.floor(1 + Math.random() * 300)}, ${Math.floor(2 + Math.random() * 20)}층`,
        detailedAddress: `${Math.floor(Math.random() * 5)}`,
        contactName: ['김민수', '이서연', '박지훈', '최유진', '정도현'][Math.floor(Math.random() * 5)],
        contactPosition: ['사원', '대리', '과장', '차장', '부장'][Math.floor(Math.random() * 5)],
        contactEmail: `user${Math.floor(Math.random() * 1000)}@example.co.kr`,
        contactPhone: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        companyAccountManager: '홍길동1',
        vatApplicable: 'N',
        remarks: `비고_${Math.random().toString(36).substring(7)}_1`,
        bankName: '수협은행',
        accountHolder: `(주)${['테스트', '샘플', '가나다', '에이비씨'][Math.floor(Math.random() * 4)]}컴퍼니`,
        accountDisplayName: '법인 운영계좌',
        accountNumber: `${Math.floor(100000 + Math.random() * 900000)}-${Math.floor(10 + Math.random() * 90)}-${Math.floor(100000 + Math.random() * 900000)}`,
    },
];