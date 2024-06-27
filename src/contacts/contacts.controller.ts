import { Controller, Get } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contacts: ContactsService) {}

  @Get()
  getContacts() {
    return this.contacts.getContacts();
  }
}
