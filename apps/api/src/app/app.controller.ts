import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@ApiTags('app')
@Controller({
  path: '/',
  version: VERSION_NEUTRAL,
})
export class AppController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @HealthCheck()
  @Get('/health')
  check() {
    return this.healthCheckService.check([]);
  }
}
