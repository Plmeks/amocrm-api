import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { getApiUri, getHeaders } from 'src/utils/api';
import { Contact, ContactsResponse } from './contacts.interface';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);
  private readonly API_URI = getApiUri();

  constructor(private readonly httpService: HttpService) {}

  async getContacts(): Promise<Contact[]> {
    const headers = getHeaders();
    const apiUrl = `${this.API_URI}/contacts`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<ContactsResponse>(apiUrl, { headers }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data || error.message);
            throw new InternalServerErrorException(
              'Error fetching contacts from API',
            );
          }),
        ),
      );
      return data._embedded?.contacts || [];
    } catch (error) {
      this.logger.error(
        `Failed to fetch contacts from ${apiUrl}: ${error.message}`,
      );
      throw new InternalServerErrorException(
        'Failed to fetch contacts from API',
      );
    }
  }
}
