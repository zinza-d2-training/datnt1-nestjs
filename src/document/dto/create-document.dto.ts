import { IsNotEmpty } from 'class-validator';

export class CreateDocumentDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  link: string;

  constructor(partial: Partial<CreateDocumentDto>) {
    Object.assign(this, partial);
  }
}
