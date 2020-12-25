import { Schema, Document, Connection } from 'mongoose'
import { Provider } from '@nestjs/common'

export interface Product {
    id: number
    image: string
    name: string
    permalink: string
    price: number
    qnt: number
}

export const ProductSchema = new Schema(
    {
        id: Number,
        image: String,
        name: String,
        permalink: String,
        price: Number,
        qnt: Number,
    },
    { _id: false }
)

export interface Installment {
    installment: number
    date: string
    paid: boolean
    value: number
}

export const InstallmentSchema = new Schema(
    {
        installment: Number,
        date: String,
        paid: Boolean,
        value: Number,
    },
    { _id: false }
)

export interface iOrder extends Document {
    customer: string
    date: string
    installments_options?: {
        installment_value: number
        number_instalments: number
        total_value_installmented: number
        installments: Installment[]
    }
    payment_method: string
    products: Product[]
    shipping?: number
    obs: string
    createOrderAt?: string
}

export const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'custumers',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    payment_method: {
        type: String,
        required: true,
    },
    installments_options: {
        installment_value: Number,
        number_instalments: Number,
        total_value_installmented: Number,
        installments: [InstallmentSchema],
    },
    obs: String,
    products: [ProductSchema],
    shipping: Number,
    createOrderAt: Date,
})

export default {
    provide: 'order_model',
    inject: ['MONGO_CONNECTION'],
    useFactory(con: Connection) {
        return con.model<iOrder>('order', OrderSchema)
    },
} as Provider
