import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';
import { UsersModule } from 'src/users/users.module';
import { ContactsModule } from 'src/contacts/contacts.module';

@Module({
  imports: [HttpModule, UsersModule, ContactsModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class LeadsModule {}
