const _dateMonthToNum = (date) => {
  switch (date) {
    case 'January':
      return 0;
    case 'February':
      return 1;
    case 'March':
      return 2;
    case 'April':
      return 3;
    case 'May':
      return 4;
    case 'June':
      return 5;
    case 'July':
      return 6;
    case 'August':
      return 7;
    case 'September':
      return 8;
    case 'October':
      return 9;
    case 'November':
      return 10;
    case 'December':
      return 11;
    default:
      return 'Invalid date';
  }
};

const _isCatchableToday = (fishData, today, hemisphere) => {
  const dateRangeString = fishData[`${hemisphere}Date`];
  const dateRanges = dateRangeString.split('/');

  //TODO: do a fancier loop
  for (let i = 0; i < dateRanges.length; i += 1) {
    const dr = dateRanges[i];

    let [lower, upper] = dr.split('-');

    lower = _dateMonthToNum(lower);
    upper = upper != null ? _dateMonthToNum(upper) : lower;

    const month = today.getMonth();

    const inRange = month >= lower && month <= upper;

    if (inRange) {
      return true;
    }
  }

  return false;
};

const _isCatchableRightNow = (fishData, today) => {
  const timeString = fishData.time;

  if (timeString === '')

  return false;
};

export const isCatchable = (fishData, hemisphere) => {
  const today = new Date();
  console.log(`isCatchable: ${JSON.stringify(fishData)}`);

  const catchableToday = _isCatchableToday(fishData, today, hemisphere);
  // Only check now if today is good, otherwise shortcircuit
  const catchableNow = catchableToday
    ? _isCatchableRightNow(fishData, today)
    : false;

  return {
    catchableNow,
    catchableToday,
  };
};
