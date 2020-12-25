import { Model } from 'mongoose'
import { Response } from 'express'
import { iOrder } from 'src/repositories/order'
import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Inject,
    Injectable,
    Post,
    Res,
} from '@nestjs/common'

@Injectable()
@Controller('order')
export class OrderController {
    constructor(
        @Inject('order_model')
        private model: Model<iOrder>
    ) {}

    @Get()
    async findAll(): Promise<iOrder[]> {
        return await this.model.find().populate('customer')
    }

    @Post()
    async save(
        @Body() order: Partial<iOrder>,
        @Res() res: Response
    ): Promise<void> {
        if (order._id) {
            const selectedOrder = await this.model.findById(order._id)
            await selectedOrder.update(order).exec()
            res.status(HttpStatus.OK).send(order._id)
        } else {
            const { _id } = await this.model.create(order as iOrder)
            res.status(HttpStatus.CREATED).json(_id)
        }
    }
}
