import { BadRequestException, flatten } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export abstract class BaseCommand {
  static create<T extends BaseCommand>(
    this: new (...args: any[]) => T,
    data: T,
  ): T {
    const convertedObject = plainToInstance<T, any>(this, {
      ...data,
    });

    const errors = validateSync(convertedObject as unknown as object);

    if (errors?.length) {
      const mappedErrors = flatten(
        errors.map((item) => Object.values(item.constraints ?? {})),
      );

      throw new BadRequestException(
        `Validation failed: ${mappedErrors.join(', ')}`,
      );
    }

    return convertedObject;
  }
}
