import { Model } from 'mongoose'
import { iCustomer } from 'src/repositories/customer'
import {
    Controller,
    Injectable,
    Inject,
    Get,
    Post,
    Body,
    HttpStatus,
    Res,
    Delete,
    Param,
} from '@nestjs/common'
import { Response } from 'express'

@Injectable()
@Controller('customers')
export class CustomerController {
    constructor(
        @Inject('customer_model')
        private model: Model<iCustomer>
    ) {}

    @Get()
    async findAll(): Promise<iCustomer[]> {
        return await this.model.find()
    }

    @Post()
    async save(
        @Body() customerData: Partial<iCustomer>,
        @Res() res: Response
    ): Promise<void> {
        try {
            // console.log(customerData._id)
            if (customerData._id) {
                const customer = await this.model.findById(customerData._id)
                await customer.update(customerData).exec()
                res.status(HttpStatus.OK).send()
            } else {
                this.model.create(customerData as iCustomer)
                res.status(HttpStatus.CREATED).send()
            }
        } catch (error) {
            res.status(HttpStatus.BAD_REQUEST).json(error)
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
