export interface UserPatient {
    id: number;
    id_user?: number;
    email: string;
    name_patient: string;
    allergies: any;
    difficulties: any;
    discapacity: number;
    isactive: number;
    createdat: Date;
    updatedat: Date;
    phone_number: string;
    birthday: string;
}