import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/ssr';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
    // ⚠️ DO NOT re-provide NgRx, Effects, or Router here
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
