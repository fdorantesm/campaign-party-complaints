import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FilterQuery, QueryOptions, PaginateResult, Types } from 'mongoose';
import * as csv from 'fast-csv';

import { MongodbQueryResultType } from '../../common/types/mongodb-query-result.type';
import { ComplaintEntity } from '../entities/complaint.entity';
import { ComplaintRepository } from '../repositories/complaint.repository';
import { UpdateComplaintDto } from '../dtos/update-complaint.dto';
import { CityService } from '../../geo/services/city.service';
import { StateService } from '../../geo/services/state.service';
import { FileService } from '../../file/services/file.service';
import { CreateComplaintDto } from '../dtos/create-complaint.dto';

@Injectable()
export class ComplaintService {
  constructor(
    private readonly repository: ComplaintRepository,
    private readonly stateService: StateService,
    private readonly cityService: CityService,
    private readonly fileService: FileService,
  ) {}

  public find(
    filter?: FilterQuery<ComplaintEntity>,
    options?: QueryOptions,
  ): Promise<PaginateResult<ComplaintEntity>> {
    return this.repository.find(filter, options);
  }

  public findOne(
    filter?: FilterQuery<ComplaintEntity>,
    options?: QueryOptions,
  ): Promise<ComplaintEntity> {
    return this.repository.findOne(filter, options);
  }

  public create(
    data: CreateComplaintDto,
    user: Types.ObjectId,
  ): Promise<ComplaintEntity> {
    const complaint: Partial<ComplaintEntity> = {
      ...data,
      user: Types.ObjectId(user?.toString()),
    };

    if (data.city) {
      complaint.city = Types.ObjectId(complaint.city.toString());
    }

    if (data.state) {
      complaint.state = Types.ObjectId(complaint.state.toString());
    }

    return this.repository.create(complaint);
  }

  public async update(
    filter: FilterQuery<ComplaintEntity>,
    data: UpdateComplaintDto,
    options?: QueryOptions,
  ): Promise<ComplaintEntity> {
    let complaintData: Partial<ComplaintEntity> = { ...data };
    const complaint = await this.findOne(filter);

    const state = await this.stateService.findOne({
      _id: data.state || complaint.state,
    });

    if (!state) {
      throw new BadRequestException('El estado no es válido');
    }

    complaintData.state = state._id;

    if (data.city) {
      const city = await this.cityService.findOne({
        _id: data.city,
        state: state._id,
      });

      if (!city) {
        throw new BadRequestException('La ciudad no es válida');
      }

      complaintData.city = city._id;
    }

    if (data.files) {
      const assets = await this.fileService.find({ _id: data.files });
      const complaint = await this.findOne(filter);
      const files = complaint.files.concat(
        assets.docs.map((asset) => asset._id),
      );
      complaintData.files = files.filter(
        (item, position) => files.indexOf(item) === position,
      );
    }

    if (data.latitude && data.longitude) {
      complaintData.eventLocation = {
        type: 'Point',
        coordinates: [data.longitude, data.latitude],
      };
    }

    return this.repository
      .update(filter, complaintData, options)
      .then(() => this.findOne(filter, options));
  }

  public async delete(
    filter: FilterQuery<ComplaintEntity>,
  ): Promise<MongodbQueryResultType> {
    const complaint = await this.findOne(filter);
    if (!complaint) {
      throw new NotFoundException('Recurso no encontrado');
    }
    return this.repository.delete(filter);
  }

  // public csv(
  //   filter?: FilterQuery<ComplaintEntity>,
  //   options?: QueryOptions,
  // ): Promise<any> {
  //   const rows = this.repository.csv(filter, options);
  //   // const csvStream = csv.format({ headers: true });
  //   console.log(rows);
  //   // rows.map((row) => {
  //   //   csvStream.write({
  //   //     tipo:
  //   //       row.complaintType === 'act'
  //   //         ? 'Acto irregular'
  //   //         : 'Gastos de campaña',
  //   //     cargo: row.positon.name,
  //   //     candidato: row.candidate,
  //   //     partido: row.party,
  //   //     state: row.state.name,
  //   //     city: row.city.name,
  //   //     archivos: row.files.join(','),
  //   //     descripcion: row.description,
  //   //     fecha: row.eventDateTime,
  //   //   });
  //   // });
  //   // csvStream.pipe(process.stdout).on('end', () => Promise.resolve());
  //   // csvStream.end();
  // }
}
