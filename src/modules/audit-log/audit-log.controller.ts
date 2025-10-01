import { Controller, Get, Query, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { AuditService } from './audit-log.service';
import { Roles } from 'src/utils/decorator/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { CurrentUser } from 'src/utils/decorator/user.decorator';

@Controller('audit')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  // Only admins can view all audit logs
  @Get()
  @Roles(UserRole.ADMIN)
  findAll(@Query() filters: any) {
    return this.auditService.findAll(filters);
  }

  // Users can view their own audit logs
  @Get('my-logs')
  findMyLogs(@CurrentUser() user: any) {
    return this.auditService.findByUser(user.id);
  }

  // View audit logs for a specific entity
  @Get('entity/:entity/:entityId')
  @Roles(UserRole.ADMIN, UserRole.LIBRARIAN)
  findByEntity(
    @Param('entity') entity: string,
    @Param('entityId') entityId: string,
  ) {
    return this.auditService.findByEntity(entity, entityId);
  }
}