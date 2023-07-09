import { registerDecorator, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';

const ISO_REGEX = /^(?:\d{4})-(?:\d{2})-(?:\d{2})T(?:\d{2}):(?:\d{2}):(?:\d{2}(?:\.\d*)?)(?:(?:-(?:\d{2}):(?:\d{2})|Z)?)$/;

export function IsISODate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsISODate',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return ISO_REGEX.test(value);
        },
      },
    });
  };
}

export function IsObjectId(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsObjectId',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any) {
          return Types.ObjectId.isValid(value);
        },
      },
    });
  };
}
