export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
    phone_number: string;
    address: string;
    profile_img: string;
}

export interface RegisterResponse {
    status: string;
    message: string;
}