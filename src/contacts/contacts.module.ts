import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService],
  imports: [HttpModule],
  exports: [ContactsService],
})
export class ContactsModule {}
