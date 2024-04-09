import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: 'Полное наименование организации',
    nullable: false,
  })
  fullName: string;

  @ApiProperty({
    description: 'Сокращенное наименование организации',
    nullable: false,
  })
  shortName: string;

  @ApiProperty({
    description: 'ИНН',
    nullable: false,
  })
  inn: number;

  @ApiProperty({
    description: 'КПП',
    nullable: false,
  })
  kpp: number;

  @ApiProperty({
    description: 'Почтовый адрес',
    nullable: false,
  })
  postAddress: string;

  @ApiProperty({
    description: 'Фактический адрес',
    nullable: false,
  })
  factAddress: string;

  @ApiProperty({
    description: 'Адрес совпадает',
    nullable: false,
  })
  isAddressEq: boolean;
}
