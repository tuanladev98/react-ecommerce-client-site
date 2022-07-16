const formatGenderUtil = (gender) => {
  if (gender === 'MALE') return 'Men';
  if (gender === 'FEMALE') return 'Women';
  if (gender === 'KID') return 'Kids';
};

export default formatGenderUtil;
