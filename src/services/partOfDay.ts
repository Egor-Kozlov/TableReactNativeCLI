const partOfDay = (): string => {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 12) {
    return 'Доброе утро';
  } else if (hours < 17) {
    return 'Добрый день';
  } else {
    return 'Добрый вечер';
  }
};

export default partOfDay;
