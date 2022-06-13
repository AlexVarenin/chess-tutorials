import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'ngx-avatar';
import { NgxEditorModule } from 'ngx-editor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { StudentsComponent } from './components/students/students.component';
import { ChessAvatarComponent } from './components/chess-avatar/chess-avatar.component';
import { ChessLabelComponent } from './components/chess-label/chess-label.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupComponent } from './components/group/group.component';
import { UserNamePipe } from './pipes/user-name/piece-name.pipe';
import { PieceNamePipe } from './pipes/piece-name/piece-name.pipe';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import { LoginComponent } from './components/login/login.component';
import { RegistrationTutorComponent } from './components/registration-tutor/registration-tutor.component';
import { RegistrationStudentComponent } from './components/registration-student/registration-student.component';
import { SelectedFilterPipe } from './pipes/selected-filter/selected-filter.pipe';
import { HiddenForDirective } from './directives/hidden-for/hidden-for.directive';
import { ChessLangSwitcherComponent } from './components/chess-lang-switcher/chess-lang-switcher.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
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
import { ChessProgressComponent } from './components/chess-progress/chess-progress.component';
import { SafeHtmlPipe } from './pipes/safe-html/safe-html.pipe';
import { ListLessonComponent } from './components/list-lesson/list-lesson.component';
import { ListGroupLessonComponent } from './components/list-group-lesson/list-group-lesson.component';

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
    SelectedFilterPipe,
    SafeHtmlPipe,
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
    LoginComponent,
    RegistrationTutorComponent,
    RegistrationStudentComponent,
    HiddenForDirective,
    ChessLangSwitcherComponent,
    StatisticsComponent,
    ChessProgressComponent,
    ListLessonComponent,
    ListGroupLessonComponent
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
    MatMenuModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatTableModule,
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
