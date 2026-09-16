export const LOCALES = ['es', 'en'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'es';

type UiStrings = {
  readonly siteTitle: string;
  readonly siteDescription: string;
  readonly navHome: string;
  readonly navWriting: string;
  readonly writingTitle: string;
  readonly writingIntro: string;
  readonly readInOtherLanguage: string;
  readonly noPostsYet: string;
  readonly updatedOn: string;
  readonly backToWriting: string;
};

export const ui: Readonly<Record<Locale, UiStrings>> = {
  es: {
    siteTitle: 'Ervin Díaz',
    siteDescription: 'Pensamientos y notas técnicas sobre construir software que aguante.',
    navHome: 'Inicio',
    navWriting: 'Escritos',
    writingTitle: 'Escritos',
    writingIntro: 'Notas técnicas y pensamientos, en orden cronológico inverso.',
    readInOtherLanguage: 'Read in English',
    noPostsYet: 'Todavía no hay nada publicado aquí.',
    updatedOn: 'Actualizado el',
    backToWriting: 'Volver a Escritos',
  },
  en: {
    siteTitle: 'Ervin Díaz',
    siteDescription: 'Thoughts and technical notes on building software that holds up.',
    navHome: 'Home',
    navWriting: 'Writing',
    writingTitle: 'Writing',
    writingIntro: 'Technical notes and thoughts, newest first.',
    readInOtherLanguage: 'Leer en español',
    noPostsYet: 'Nothing published here yet.',
    updatedOn: 'Updated on',
    backToWriting: 'Back to Writing',
  },
};
