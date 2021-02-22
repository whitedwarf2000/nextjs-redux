const isEmpty = value =>
  [Object, Array].includes((value || {}).constructor) && !Object.entries(value || {}).length;

export default isEmpty;
