const isString = str => {
  return !!(str && typeof str.valueOf() === 'string');
};

export default isString;
