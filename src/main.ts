import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppSettings } from './app/app.settings';

AppSettings.setAppConfig();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
