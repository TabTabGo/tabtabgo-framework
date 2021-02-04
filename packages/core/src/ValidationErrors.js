//TODO Pass language
export const required = (name) => `${name} is required`;
export const regex = (regex, name) => `${name} is not valid input`;
// function to validate email
export const email = (name) => `${name} is not valid`;
// function that verifies if a string has a length less than or equal length
export const maxLength = (length, name) => `${name} length is more than required length ${length}`;
// function that verifies if a string has a length more than or equal length
export const minLength = (length, name) => `${name} length is less than required length ${length}`;
// function that verifies if value are equal in length
export const equalLength = (length, name) => `${name} length is not equal to required length ${length}`;
export const maxValue = (length, name) => `${name} value is more than ${length}`;
// function that verifies if a string has a length more than or equal length
export const minValue = (length, name) => `${name} value is less than ${length}`;
// function that verifies if value are equal in length
export const equalValue = (length, name) => `${name} value is not equal to ${length}`;
export const range = (lengths = [0, -1], name) => `${name} length is not between range [${lengths[0]},${lengths[1]}]`;
// function that verifies if two strings are equal
export const equalTo = (string1, name) => `${name} is not equal to`;
// function that verifies if value contains only numbers
export const number = (name) => `${name} is not number`;
// verifies if value is a valid URL
export const url = (name) => `${name} is not url`;
