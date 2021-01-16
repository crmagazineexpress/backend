import { Module, Provider } from '@nestjs/common'
import * as Mongoose from 'mongoose'

export const dbConnection: Provider[] = [
    {
        provide: 'MONGO_CONNECTION',
        useFactory(): Promise<typeof Mongoose> {
            return Mongoose.connect('mongodb://localhost:27017/crmanage', {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
        },
    },
]

@Module({
    providers: [...dbConnection],
    exports: [...dbConnection],
})
export class DatabaseModule {}
