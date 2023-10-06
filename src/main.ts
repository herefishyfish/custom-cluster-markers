import { platformNativeScript, runNativeScriptAngularApp } from '@nativescript/angular';
import { installMixins } from '@nativescript/google-maps-utils';
import { AppModule } from './app/app.module';

installMixins();

runNativeScriptAngularApp({
  appModuleBootstrap: () => platformNativeScript().bootstrapModule(AppModule),
});

