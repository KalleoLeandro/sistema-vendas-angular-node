export interface LoginRequest {
    usuario: string,
    senha:string
}

export interface LoginResponse {
    id: number,
    perfil:string
}