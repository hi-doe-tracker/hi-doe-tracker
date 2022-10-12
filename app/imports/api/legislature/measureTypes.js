import _ from 'lodash';

export const measureTypes = {
  HB: 'hb',
  SB: 'sb',
  HR: 'hr',
  SR: 'sr',
  HCR: 'hcr',
  SCR: 'scr',
  GM: 'gm',
};

export const isValidMeasureType = (type) => _.includes(measureTypes, type);
export const getRandomMeasureType = () => {
  const keys = Object.keys(measureTypes);
  return measureTypes[keys[Math.floor(keys.length * Math.random())]];
};
