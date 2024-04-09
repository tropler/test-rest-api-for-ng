import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@ApiTags('Компании')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все компании' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success',
    type: [Company],
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить компанию по идентификатору' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Company })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Добавить компанию' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: Company,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные компании' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Company })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить компанию' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Company })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
