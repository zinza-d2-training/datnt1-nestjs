import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';

import { Document } from 'typeorm/entities/document.entity';
import { CreateDocumentDto } from './dto/create-document.dto';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async findAll() {
    return await this.documentRepository.find();
  }

  async uploadFile(file: Express.Multer.File, name: string) {
    const { filename } = file;

    return await this.documentRepository.insert({
      name: name,
      link: filename,
    });
  }

  async uploadMultipleFiles(files: Express.Multer.File[], name: string) {
    const documents: CreateDocumentDto[] = files.map((file) => {
      return new CreateDocumentDto({
        name: name,
        link: file.filename,
      });
    });

    return await this.documentRepository.insert(documents);
  }

  async getUploadedFileById(id: number, res: Response) {
    const document = await this.documentRepository.findOne({
      where: { document_id: id },
    });

    return res.sendFile(document.link, { root: 'upload' });
  }
}
