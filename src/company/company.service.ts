import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { delay, Observable, of } from 'rxjs';

import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  private _companiesList: Company[] = [
    {
      id: 1,
      fullName: 'Общество с ограниченной ответственностью Рога и Копыта',
      shortName: 'ООО Рога и Копыта',
      inn: 7702123456,
      kpp: 770201001,
      isAddressEq: true,
      postAddress: 'Санкт-петербург, ул. Флюгера д.7',
      factAddress: 'Санкт-петербург, ул. Флюгера д.7',
    },
    {
      id: 2,
      fullName: 'Акционерное общество Клипс Энд Моторс',
      shortName: 'АО КЭМ',
      inn: 7744001497,
      kpp: 997950001,
      isAddressEq: true,
      postAddress: 'Санкт-петербург, ул. Гончарной д.27',
      factAddress: 'Санкт-петербург, ул. Гончарной д.27',
    },
    {
      id: 3,
      fullName: 'Общество с ограниченной ответственностью Веселый молочник',
      shortName: 'ООО Веселый молочник',
      inn: 9722054805,
      kpp: 772201001,
      isAddressEq: false,
      postAddress: 'Самара, пр-т Победы, д.1',
      factAddress: 'Самара, ул. Фрунзе д.17',
    },
  ];
  private _lastId = 3;

  private get _randomDelay(): number {
    return Math.floor(Math.random() * 900) + 100;
  }

  public create(createCompanyDto: CreateCompanyDto): Observable<Company> {
    this._lastId = ++this._lastId;

    const newCompany = {
      id: this._lastId,
      ...createCompanyDto,
    };

    this._companiesList.push(newCompany);

    return of(newCompany).pipe(delay(this._randomDelay));
  }

  public findAll(): Observable<Company[]> {
    return of(this._companiesList).pipe(delay(this._randomDelay));
  }

  public findOne(id: number): Observable<Company> {
    const company = this._companiesList.find((c) => c.id === id);

    if (!company) {
      throw new HttpException('Компания не найдена', HttpStatus.BAD_REQUEST);
    }

    return of(company).pipe(delay(this._randomDelay));
  }

  public update(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Observable<Company> {
    const index = this._companiesList.findIndex((c) => c.id == id);

    if (index === -1) {
      throw new HttpException('Компания не найдена', HttpStatus.BAD_REQUEST);
    }

    const company = this._companiesList[index];
    this._companiesList[index] = { id, ...updateCompanyDto };

    return of(company).pipe(delay(this._randomDelay));
  }

  public remove(id: number): Observable<Company> {
    const company = this._companiesList.find((c) => c.id === id);

    if (!company) {
      throw new HttpException('Компания не найдена', HttpStatus.BAD_REQUEST);
    }

    this._companiesList = this._companiesList.filter((c) => c.id !== id);

    return of(company).pipe(delay(this._randomDelay));
  }
}
