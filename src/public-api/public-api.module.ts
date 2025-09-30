import { Module } from '@nestjs/common';
import { ExternalApiService } from './open-library-api/open-library-api.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    ExternalApiService
  ],
  exports: [
    ExternalApiService
  ],
})
export class PublicApiModule {}
