import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { getHeaders } from 'src/utils/api';

@Injectable()
export class ContactsService {
  private readonly logger = new Logger(ContactsService.name);

  constructor(private readonly httpService: HttpService) {}

  async getContacts(): Promise<any> {
    const headers = getHeaders();
    const apiUrl = `${process.env.AMOCRM_API_URL}/v4/contacts`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(apiUrl, { headers }).pipe(
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
