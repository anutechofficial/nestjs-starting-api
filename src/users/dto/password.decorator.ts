import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsPassword(validationOptions?: ValidationOptions) {
  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Implement your password validation logic here
          // Return true if the value is a valid password, otherwise return false.
          // You can customize the password validation rules as per your requirements.
          // Example: Password should be at least 8 characters long with at least one digit and one special character
          const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
          return typeof value === 'string' && value.match(passwordPattern) !== null;
        },
      },
    });
  };
}
