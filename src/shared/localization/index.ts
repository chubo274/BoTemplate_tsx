import i18n, { ResourceLanguage } from "i18next";
import { getI18n, initReactI18next } from "react-i18next";
import en from "./resources/en";
import vn from "./resources/vn";

export type AppLanguage = 'en' | 'vn';
type Resource = {
  [language in AppLanguage]: ResourceLanguage;
}

export const configureLocalization = (language: AppLanguage, fallback = "en") => {
  const resource: Resource = {
    en: {
      translation: en,
    },
    vn: {
      translation: vn,
    },
  }

  return i18n.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: language,
    fallbackLng: fallback,

    resources: { ...resource },

    debug: false,

    initImmediate: false,

    cache: {
      enabled: true,
    },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });
};

export const getString = (key: keyof typeof en, params?: any): string => {
  if (getI18n()) {
    return getI18n().t(key, params);
  }
  return "";
};

export const changeAppLanguage = (language: AppLanguage): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (language) {
      i18n
        .changeLanguage(language)
        .then((success: any) => {
          resolve("success");
        })
        .catch((error: any) => {
          reject(error.toString());
        });
    } else {
      reject("");
    }
  });
};
