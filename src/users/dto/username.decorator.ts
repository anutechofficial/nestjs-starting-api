import { ValidationOptions, registerDecorator, ValidationArguments } from 'class-validator';

export function IsUsername(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isUsername',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Implement your username validation logic here
          // Return true if the value is a valid username, otherwise return false.
          // You can use regex or any custom logic to validate the username.
          // Example using regex:
          const usernamePattern = /^[a-zA-Z0-9_]+$/;
          return typeof value === 'string' && value.match(usernamePattern) !== null;
        },
      },
    });
  };
}
