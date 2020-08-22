const _dateNumToMonth = (dateNum) => {
  switch (dateNum) {
    case 0:
      return 'January';
    case 1:
      return 'February';
    case 2:
      return 'March';
    case 3:
      return 'April';
    default:
      return 'Invalid date';
  }
};

const _isCatchableToday = (fishData, today) => {
  return false;
};

const _isCatchableRightNow = (fishData, today) => {
  return false;
};

export const isCatchable = (fishData) => {
  const today = new Date();

  const catchableToday = _isCatchableToday(fishData, today);
  // Only check now if today is good, otherwise disregard
  const catchableNow = catchableToday
    ? _isCatchableRightNow(fishData, today)
    : false;

  return {
    catchableNow,
    catchableToday,
  };
};
