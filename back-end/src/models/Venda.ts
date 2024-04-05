import { Produto } from "./Produto";

export interface Venda {
    id?:number,
    id_vendedor:number,        
    lista:Array<Produto>
}