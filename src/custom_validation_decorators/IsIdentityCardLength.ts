import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsIdentityCardLengthConstraint
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    return text.length == 9 || text.length == 12;
  }
}

export function IsIdentityCardLength(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsIdentityCardLengthConstraint,
    });
  };
}
