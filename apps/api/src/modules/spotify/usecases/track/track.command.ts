import { BaseCommand } from '@shared/command';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class TrackCommand extends BaseCommand {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  public readonly uri: string;
}
