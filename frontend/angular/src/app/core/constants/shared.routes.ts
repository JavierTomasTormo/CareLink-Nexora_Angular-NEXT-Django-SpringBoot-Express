export const SHARED_ROUTES = {
    ANGULAR: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout',
            PROFILE: '/profile/view',
            FAMILY: '/profile/family/view',
            RESERVATIONS: '/profile/reservations/view',
            PAYMENTS: '/profile/payments/view',
            PATIENT_REGISTER: '/profile/family/patient/register',
            PATIENT_UPDATE: '/profile/family/patient/update'
        },
        CRITICAL: {
            MEDICAL: '/medical',
            EMERGENCY: '/emergency',
            REPORTS: '/reports'
        },
        ROOMS: {
            MAP: '/rooms/view',
        },
    },
    NEXT: {
        HOME: 'http://localhost:3000',
        SHOP: 'http://localhost:3000/shop',
        MEALS: 'http://localhost:3000/meals',
        PROFILE: 'http://localhost:3000/profile'
    }
}