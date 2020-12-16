import { Module } from '@nestjs/common'

import { dbConnection, DatabaseModule } from './repositories/connection'

import { CustomerController } from './controllers/customers'
import CustomerProvider from './repositories/customer'

@Module({
    imports: [DatabaseModule],
    providers: [CustomerProvider, ...dbConnection],
    controllers: [CustomerController],
})
export class AppModule {}
