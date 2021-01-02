import { Model } from 'mongoose'
import { Response } from 'express'
import { iOrder } from 'src/repositories/order'
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Inject,
    Injectable,
    Param,
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

    @Get('/promissory-note')
    async findAllPromissoryNotes(@Res() res: Response): Promise<void> {
        try {
            const list = await this.model
                .find({
                    payment_method: 'ticket',
                    createOrderAt: { $ne: null },
                })
                .populate('customer')

            if (list.length > 0) res.status(HttpStatus.OK).json(list)
            else throw new Error('Nenhum registro encontrado!')
        } catch (error) {
            res.status(HttpStatus.NOT_FOUND).json(error)
        }
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

    @Delete(':id')
    async delete(
        @Param('id') _id: string,
        @Res() res: Response
    ): Promise<void> {
        const { deletedCount } = await this.model.deleteOne({ _id })
        if (deletedCount === 1) res.status(HttpStatus.OK).send()
        else res.status(HttpStatus.BAD_REQUEST).send()
    }
}
