export interface UsuarioRequest {
    id:number,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    sexo: string,
    telefone:string,
    celular:string,
    email:string    
    cep: string,
    rua: string,
    numero: string,
    complemento:string,
    bairro: string,
    cidade: string,
    uf: string,    
    login:string,
    senha:string,
    perfil:string
}

export interface ListaUsuariosResponse {
    id:number,
    nome:string,
    cpf:string,
    data_nascimento:string,
    sexo:string    
}

export interface UsuarioEditResponse{
    id:number,
    nome: string,
    cpf: string,
    dataNascimento: Date,
    sexo: string,
    endereco_id: number,
    dados_login_id: number,
    contato_id:number,
    telefone:string,
    celular:string,
    email:string    
    cep: string,
    rua: string,
    numero: string,
    complemento:string,
    bairro: string,
    cidade: string,
    uf: string,    
    login:string,
    senha:string,
    perfil:string
}