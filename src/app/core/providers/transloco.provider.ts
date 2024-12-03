import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import { provideTransloco as mainProvideTransloco, TranslocoService } from '@jsverse/transloco';
import { LocalStorageKeysEnum } from '@beng-core/enums/local-storage-keys.enum';
import { SupportedLanguagesEnum } from '@beng-core/enums/supported-languages.enum';
import { LocalStorageService } from '@beng-core/services/local-storage.service';
import { TranslocoHttpLoader } from '@beng-core/services/transloco-http-loader';
import { forkJoin, lastValueFrom, map } from 'rxjs';

const defaultLanguage = isDevMode() ? SupportedLanguagesEnum.EN : SupportedLanguagesEnum.TR;
const availableLangs = [SupportedLanguagesEnum.EN, SupportedLanguagesEnum.TR];

export function provideTransloco(): ApplicationConfig['providers'] {
  return [
    mainProvideTransloco({
      config: {
        defaultLang: defaultLanguage,
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: translocoInitiliazerFactory,
      deps: [TranslocoService, LocalStorageService],
      multi: true,
    },
  ];
}

function translocoInitiliazerFactory(
  translocoService: TranslocoService,
  localStorageService: LocalStorageService,
): () => Promise<boolean> {
  const isDebugMode = isDevMode();

  translocoService.setAvailableLangs(availableLangs);

  function getLanguage() {
    if (isDebugMode) {
      const storedLang = localStorageService.get(LocalStorageKeysEnum.LANGUAGE);
      if ((translocoService.getAvailableLangs() as string[]).includes(storedLang)) {
        return storedLang;
      }
    }
    return defaultLanguage;
  }

  const language = getLanguage();
  translocoService.setDefaultLang(language);
  translocoService.setActiveLang(language);

  // Load all languages in dev mode
  const languageLoaders = (isDebugMode ? translocoService.getAvailableLangs() : [language]).map((lang) =>
    translocoService.load(lang),
  );

  return () => lastValueFrom(forkJoin([...languageLoaders]).pipe(map(() => true)));
}
