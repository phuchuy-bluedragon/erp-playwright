import { formatYYYYMMDD_HHmmss } from '../../src/utils/date';

const now = Date.now();
const nowFmt = formatYYYYMMDD_HHmmss(now);

export interface ClientItemData {
    clientType: string;
    companyName: string;
    brandName: string;
    clientGrade: string;
    businessRegistrationNumber: string;
    password: string;
    // businessLicenseFile: string;
    // headOfficeAddress: string;
    detailedAddress: string;
    salesUrl: string;
    companyEmail: string;
    contactName: string;
    contactPosition: string;
    contactPhoneNumber: string;
    groupChatConsent: string;
    referrerCompany: string;
    referrerBrand: string;
    referrerName: string;
    referrerPhoneNumber: string;
}

// Bộ dữ liệu mẫu
export const clientTestData: ClientItemData[] = [
    {
        clientType: '의류브랜드',
        companyName: `${nowFmt}_1`,
        brandName: `Brand_${Math.random().toString(36).slice(2, 7)}`,
        clientGrade: '브론즈',
        businessRegistrationNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(10 + Math.random() * 90)}${Math.floor(10000 + Math.random() * 90000)}`,
        password: 'test12345',
        // businessLicenseFile: `license_${Math.random().toString(36).slice(2, 8)}.pdf`,
        // headOfficeAddress: `서울특별시 강남구 테헤란로 ${Math.floor(1 + Math.random() * 300)}, ${Math.floor(2 + Math.random() * 20)}층`,
        detailedAddress: `${Math.floor(Math.random() * 5)}`,
        salesUrl: `https://shop.${Math.random().toString(36).slice(2, 6)}.com`,
        companyEmail: `${Math.random().toString(36).slice(2, 7)}@gmail.com`,
        contactName: ['김민수', '이서연', '박지훈', '최유진', '정도현'][Math.floor(Math.random() * 5)],
        contactPosition:'회장',
        contactPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        groupChatConsent: 'Y',
        referrerCompany: `RefCompany_${Math.random().toString(36).slice(2, 6)}`,
        referrerBrand: `RefBrand_${Math.random().toString(36).slice(2, 6)}`,
        referrerName: ['홍길동', '김영희', '이철수', '박영수'][Math.floor(Math.random() * 4)],
        referrerPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    {
        clientType: '봉제공장',
        companyName: `${nowFmt}_1`,
        brandName: `Brand_${Math.random().toString(36).slice(2, 7)}`,
        clientGrade: '블랙다이아',
        businessRegistrationNumber: `${Math.floor(100 + Math.random() * 900)}${Math.floor(10 + Math.random() * 90)}${Math.floor(10000 + Math.random() * 90000)}`,
        password: 'test12345',
        // businessLicenseFile: `license_${Math.random().toString(36).slice(2, 8)}.pdf`,
        // headOfficeAddress: `서울특별시 강남구 테헤란로 ${Math.floor(1 + Math.random() * 300)}, ${Math.floor(2 + Math.random() * 20)}층`,
        detailedAddress: `${Math.floor(Math.random() * 5)}`,
        salesUrl: `https://shop.${Math.random().toString(36).slice(2, 6)}.com`,
        companyEmail: `${Math.random().toString(36).slice(2, 7)}@gmail.com`,
        contactName: ['김민수', '이서연', '박지훈', '최유진', '정도현'][Math.floor(Math.random() * 5)],
        contactPosition: '이사',
        contactPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        groupChatConsent: 'N',
        referrerCompany: `RefCompany_${Math.random().toString(36).slice(2, 6)}`,
        referrerBrand: `RefBrand_${Math.random().toString(36).slice(2, 6)}`,
        referrerName: ['홍길동', '김영희', '이철수', '박영수'][Math.floor(Math.random() * 4)],
        referrerPhoneNumber: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
];