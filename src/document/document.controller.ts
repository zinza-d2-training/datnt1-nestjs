import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import {
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express/multer';
import { Roles } from 'auth/custom_decorators/role.decorator';
import { JwtAuthGuard } from 'auth/guards/jwt-auth.guard';
import { RolesGuard } from 'auth/guards/roles.guard';
import { Role } from 'auth/types/role.enum';
import { diskStorage } from 'multer';
import { DocumentService } from './document.service';
import { editFileName } from './utils/editFileName';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async findAll() {
    return this.documentService.findAll();
  }

  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  @Post('upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('name') name: string,
  ) {
    return this.documentService.uploadFile(file, name);
  }

  @Post('upload/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './upload',
        filename: editFileName,
      }),
    }),
  )
  async uploadMultipleFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('name') name: string,
  ) {
    return this.documentService.uploadMultipleFiles(files, name);
  }

  @Get(':id')
  async getUploadedFileById(@Param('id', ParseIntPipe) id: number, @Res() res) {
    return this.documentService.getUploadedFileById(id, res);
  }
}
