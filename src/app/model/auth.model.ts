export interface AuthResponse {
    result_code: number;
    result_data: {
        token: string;
        refreshToken: string;
        userId: string;
        username: string;
        roleId: string;
        roleName: string;
    }
    result_message: string;
}
