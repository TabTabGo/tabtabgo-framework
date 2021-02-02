//TODO Pass language
export const required = (name: string) => `${name} is required`;

export const regex = (regex: RegExp, name: string) => `${name} is not valid input`;
// function to validate email
export const email = (name: string) => `${name} is not valid`;
// function that verifies if a string has a length less than or equal length
export const maxLength = (length: number, name: string) =>
  `${name} length is more than required length ${length}`;
// function that verifies if a string has a length more than or equal length
export const minLength = (length: number, name: string) =>
  `${name} length is less than required length ${length}`;
// function that verifies if value are equal in length
export const equalLength = (length: number, name: string) =>
  `${name} length is not equal to required length ${length}`;
export const maxValue = (length: number, name: string) => `${name} value is more than ${length}`;
// function that verifies if a string has a length more than or equal length
export const minValue = (length: number, name: string) => `${name} value is less than ${length}`;
// function that verifies if value are equal in length
export const equalValue = (length: number, name: string) =>
  `${name} value is not equal to ${length}`;

export const range = (lengths = [0, -1], name: string) =>
  `${name} length is not between range [${lengths[0]},${lengths[1]}]`;

// function that verifies if two strings are equal
export const equalTo = (string1: string, name: string) => `${name} is not equal to`;
// function that verifies if value contains only numbers
export const number = (name: string) => `${name} is not number`;
// verifies if value is a valid URL
export const url = (name: string) => `${name} is not url`;
