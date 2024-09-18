const replaceSpacesWithUnderscores = (str: string): string => {
  return str.replace(/ /g, '_').toLocaleLowerCase();
};

export default replaceSpacesWithUnderscores;
