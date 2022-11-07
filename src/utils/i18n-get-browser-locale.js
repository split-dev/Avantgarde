
export default (countryCodeOnly = true) => {
  const userLanguage = navigator.languages
    ? navigator.languages[0]
    : navigator.language;

  if (!userLanguage) return null;

  return countryCodeOnly
    ? userLanguage.trim().split(/-|_/)[0]
    : userLanguage.trim();
}