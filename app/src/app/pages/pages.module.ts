import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PagesRoutingModule } from "./pages-routing.module";
import { TranslateModule } from "@ngx-translate/core";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatGridListModule } from "@angular/material/grid-list";

import { StatModule } from "./../modules/stat/stat.module";
import { SharedModule } from "../@shared/shared.module";

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from "@angular/material";

import { TopnavComponent } from "../@shared/layout/components/topnav/topnav.component";
import { SidebarComponent } from "../@shared/layout/components/sidebar/sidebar.component";
import { LayoutComponent } from "../@shared/layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { UsersComponent } from "./users/users.component";
import { MatBottomSheetModule } from "@angular/material/bottom-sheet";

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatListModule,
    TranslateModule,
    MatGridListModule,
    StatModule,
    SharedModule,
    MatCardModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatRadioModule,
    FlexLayoutModule.withConfig({ addFlexToParent: false }),
    MatBottomSheetModule,
    MatTooltipModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [
    TopnavComponent,
    SidebarComponent,
    LayoutComponent,
    DashboardComponent,
    UsersComponent,
  ],
  exports: [],
  providers: [],
})
export class PagesModule {}
