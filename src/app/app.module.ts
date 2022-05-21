import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { NgxEditorModule } from 'ngx-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { HeaderComponent } from './components/header/header.component';
import { BoardComponent } from './components/board/board.component';
import { BuilderComponent } from './components/builder/builder.component';

import { PieceIconPipe } from './pipes/piece-icon/piece-icon.pipe';
import { ChessTextEditorComponent } from './components/chess-text-editor/chess-text-editor.component';
import { LessonsComponent } from './components/lessons/lessons.component';
import { RootStoreModule } from './store/root-store.module';
import { LessonComponent } from './components/lesson/lesson.component';
import { ChessModalsWrapperComponent } from './components/chess-modals-wrapper/chess-modals-wrapper.component';
import { ChessConfirmationDialogComponent } from './components/chess-confirmation-dialog/chess-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PieceNamePipe } from './pipes/piece-name/piece-name.pipe';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StudentsComponent } from './components/students/students.component';
import { AvatarModule } from 'ngx-avatar';
import { ChessAvatarComponent } from './components/chess-avatar/chess-avatar.component';
import { MatChipsModule } from '@angular/material/chips';
import { ChessLabelComponent } from './components/chess-label/chess-label.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { UserNamePipe } from './pipes/user-name/piece-name.pipe';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import {LoginComponent} from "./components/login/login.component";


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    HeaderComponent,
    BoardComponent,
    BuilderComponent,
    ChessTextEditorComponent,
    PieceIconPipe,
    PieceNamePipe,
    LessonsComponent,
    LessonComponent,
    ChessModalsWrapperComponent,
    ChessConfirmationDialogComponent,
    StudentsComponent,
    GroupsComponent,
    ChessAvatarComponent,
    ChessLabelComponent,
    GroupComponent,
    UserNamePipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    NgxEditorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    RootStoreModule,
    MatDialogModule,
    MatRadioModule,
    MatSlideToggleModule,
    AvatarModule,
    MatChipsModule,
    MatAutocompleteModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      },
      useDefaultLang: false
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
