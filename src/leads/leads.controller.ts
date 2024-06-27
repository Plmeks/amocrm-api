import { Controller, Get, Query } from '@nestjs/common';
import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get()
  getLeads(@Query() queryString) {
    return this.leadsService.getLeads(queryString.query);
  }

  @Get('statuses')
  getPipelinesStatuses() {
    return this.leadsService.getPipelineStatuses();
  }
}
