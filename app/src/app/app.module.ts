import { LayoutModule } from "@angular/cdk/layout";
import { OverlayModule } from "@angular/cdk/overlay";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
export const createTranslateLoader = (http: HttpClient) => {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    OverlayModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
