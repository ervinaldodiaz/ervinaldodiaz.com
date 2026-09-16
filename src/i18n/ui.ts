export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

type UiStrings = {
  readonly siteTitle: string;
  readonly siteDescription: string;
  readonly tagline: string;
  readonly navHome: string;
  readonly navWriting: string;
  readonly writingTitle: string;
  readonly writingIntro: string;
  readonly readInOtherLanguage: string;
  readonly noPostsYet: string;
  readonly updatedOn: string;
  readonly backToWriting: string;
  readonly feedLabel: string;
  readonly otherLanguageShort: string;
  readonly scrollCue: string;
  readonly elsewhere: string;
};

export const ui: Readonly<Record<Locale, UiStrings>> = {
  es: {
    siteTitle: 'Ervin Díaz',
    siteDescription: 'Pensamientos y notas técnicas de un ingeniero de software.',
    tagline: 'Hola Mundo!',
    navHome: 'Inicio',
    navWriting: 'Escritos',
    writingTitle: 'Escritos',
    writingIntro: 'Notas técnicas y pensamientos, en orden cronológico inverso.',
    readInOtherLanguage: 'Read in English',
    noPostsYet: 'Todavía no hay nada publicado aquí.',
    updatedOn: 'Actualizado el',
    backToWriting: 'Volver a Escritos',
    feedLabel: 'RSS',
    otherLanguageShort: 'EN',
    scrollCue: 'Desliza',
    elsewhere: 'En otros lados',
  },
  en: {
    siteTitle: 'Ervin Díaz',
    siteDescription: 'Thoughts and technical notes from a software engineer.',
    tagline: 'Hello World!',
    navHome: 'Home',
    navWriting: 'Writing',
    writingTitle: 'Writing',
    writingIntro: 'Technical notes and thoughts, newest first.',
    readInOtherLanguage: 'Leer en español',
    noPostsYet: 'Nothing published here yet.',
    updatedOn: 'Updated on',
    backToWriting: 'Back to Writing',
    feedLabel: 'RSS',
    otherLanguageShort: 'ES',
    scrollCue: 'Scroll',
    elsewhere: 'Elsewhere',
  },
};
