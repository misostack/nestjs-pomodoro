import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule.forRoot(), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
