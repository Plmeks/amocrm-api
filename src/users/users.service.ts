import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { getApiUri, getHeaders } from 'src/utils/api';
import { User, UsersResponse } from './users.interface';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private readonly API_URI = `${getApiUri()}/users`;

  constructor(private readonly httpService: HttpService) {}

  async getUsers(): Promise<User[]> {
    const headers = getHeaders();

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<UsersResponse>(this.API_URI, { headers }).pipe(
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
        `Failed to fetch users from ${this.API_URI}: ${error.message}`,
      );
      throw new InternalServerErrorException('Failed to fetch users from API');
    }
  }
}
