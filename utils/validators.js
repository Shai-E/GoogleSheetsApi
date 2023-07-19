export const isOfAge = input => {
  const age = typeof input === 'string' ? parseInt(input, 10) : input;
  return age >= 18;
};
