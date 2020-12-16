import { Schema, Document, Connection } from 'mongoose'
import { Provider } from '@nestjs/common'

export interface iCustomer extends Document {
    nome: string
    email: string
    cpf: string
    telefone: string
    celular: string
    bairro: string
    cep: string
    complemento: string
    localidade: string
    logradouro: string
    numero: string
    uf: string
    referencia: string
}

export const CustomerSchema = new Schema({
    nome: String,
    email: String,
    cpf: String,
    telefone: String,
    celular: String,
    bairro: String,
    cep: String,
    complemento: String,
    localidade: String,
    logradouro: String,
    numero: String,
    uf: String,
    referencia: String,
})

export default {
    provide: 'customer_model',
    inject: ['MONGO_CONNECTION'],
    useFactory(con: Connection) {
        return con.model<iCustomer>('custumers', CustomerSchema)
    },
} as Provider
