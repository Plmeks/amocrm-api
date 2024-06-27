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
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<any> {
    const headers = getHeaders();
    const apiUrl = `${process.env.AMOCRM_API_URL}/v4/users`;

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(apiUrl, { headers }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data || error.message);
            throw new InternalServerErrorException(
              'Error fetching users from API',
            );
          }),
        ),
      );
      return data._embedded?.users || [];
    } catch (error) {
      this.logger.error(
        `Failed to fetch users from ${apiUrl}: ${error.message}`,
      );
      throw new InternalServerErrorException('Failed to fetch users from API');
    }
  }
}
