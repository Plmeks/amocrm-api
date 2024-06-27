import { catchError, firstValueFrom } from 'rxjs';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { UsersService } from 'src/users/users.service';
import { ContactsService } from 'src/contacts/contacts.service';
import { getApiUri, getHeaders } from 'src/utils/api';
import { Contact } from 'src/contacts/contacts.interface';
import { User } from 'src/users/users.interface';
import {
  Lead,
  LeadsResponse,
  PipelineStatus,
  PipelineResponse,
} from './leads.interface';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private API_URI = `${getApiUri()}/leads`;

  constructor(
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly contactsService: ContactsService,
  ) {}

  private findContactsCustomField(contacts: Contact, code: string) {
    const customField = contacts?.custom_fields_values?.find(
      (field) => field.field_code === code,
    )?.values?.[0];
    return customField?.value;
  }

  private async fetchData<T>(url: string): Promise<T> {
    const headers = getHeaders();

    try {
      const { data } = await firstValueFrom(
        this.httpService.get<T>(url, { headers }).pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response?.data || error.message);
            throw new InternalServerErrorException(
              'Error fetching data from API',
            );
          }),
        ),
      );
      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch data from ${url}: ${error.message}`);
      throw new InternalServerErrorException('Failed to fetch data from API');
    }
  }

  async getLeads(query: string): Promise<any> {
    const [leadsResult, pipelinesStatusesResult, usersResult, contactsResult] =
      await Promise.all([
        this.fetchData<LeadsResponse>(
          `${this.API_URI}?limit=250&with=contacts${
            query ? `&query=${query}` : ''
          }`,
        ),
        this.getPipelineStatuses(),
        this.usersService.getUsers(),
        this.contactsService.getContacts(),
      ]);

    const leadsData = leadsResult?._embedded?.leads || [];

    const normalizedLeadsData = leadsData.map((lead: Lead) => {
      const leadContact = lead._embedded?.contacts?.[0];
      const contactData: Contact =
        contactsResult.find(
          (contact: Contact) => contact.id === leadContact?.id,
        ) || ({} as Contact);

      return {
        ...lead,
        contact: {
          id: contactData.id,
          name: contactData.name,
          email: this.findContactsCustomField(contactData, 'EMAIL'),
          phone: this.findContactsCustomField(contactData, 'PHONE'),
        },
        status: pipelinesStatusesResult.find(
          (status: PipelineStatus) => status.id === lead.status_id,
        ),
        user: usersResult.find(
          (user: User) => user.id === lead.responsible_user_id,
        ),
      };
    });

    return normalizedLeadsData;
  }

  async getPipelineStatuses(): Promise<PipelineStatus[]> {
    const data = await this.fetchData<PipelineResponse>(
      `${this.API_URI}/pipelines`,
    );

    return data._embedded?.pipelines?.[0]?._embedded?.statuses || [];
  }
}
