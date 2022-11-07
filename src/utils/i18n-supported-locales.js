// TODO get from SB
const LOCALES = {
  en: "English",
  de: "Deutsch"
};

export const isLocaleSupported = (locale) =>
  Object.keys(LOCALES).includes(locale);

export const getSupportedLocales = () => {
  let supported = [];

  for (const code of Object.keys(LOCALES)) {
    supported.push({ code, name: LOCALES[code] });
  }

  return supported;
}

