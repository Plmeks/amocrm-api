import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [LeadsModule, UsersModule, ConfigModule.forRoot(), ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
