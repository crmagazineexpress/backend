import { Module } from '@nestjs/common'

import { dbConnection, DatabaseModule } from './repositories/connection'

import { CustomerController } from './controllers/customers'
import { OrderController } from './controllers/order'
import CustomerProvider from './repositories/customer'
import OrderProvider from './repositories/order'

@Module({
    imports: [DatabaseModule],
    providers: [CustomerProvider, OrderProvider, ...dbConnection],
    controllers: [CustomerController, OrderController],
})
export class AppModule {}
