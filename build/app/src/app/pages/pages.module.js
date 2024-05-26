"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PagesModule = void 0;
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const pages_routing_module_1 = require("./pages-routing.module");
const core_2 = require("@ngx-translate/core");
const flex_layout_1 = require("@angular/flex-layout");
const grid_list_1 = require("@angular/material/grid-list");
const stat_module_1 = require("./../modules/stat/stat.module");
const shared_module_1 = require("../@shared/shared.module");
const material_1 = require("@angular/material");
const topnav_component_1 = require("../@shared/layout/components/topnav/topnav.component");
const sidebar_component_1 = require("../@shared/layout/components/sidebar/sidebar.component");
const layout_component_1 = require("../@shared/layout/layout.component");
const dashboard_component_1 = require("./dashboard/dashboard.component");
const users_component_1 = require("./users/users.component");
const bottom_sheet_1 = require("@angular/material/bottom-sheet");
let PagesModule = class PagesModule {
};
PagesModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            pages_routing_module_1.PagesRoutingModule,
            material_1.MatToolbarModule,
            material_1.MatButtonModule,
            material_1.MatSidenavModule,
            material_1.MatIconModule,
            material_1.MatInputModule,
            material_1.MatMenuModule,
            material_1.MatListModule,
            core_2.TranslateModule,
            grid_list_1.MatGridListModule,
            stat_module_1.StatModule,
            shared_module_1.SharedModule,
            material_1.MatCardModule,
            material_1.MatCardModule,
            material_1.MatTableModule,
            material_1.MatButtonModule,
            material_1.MatIconModule,
            material_1.MatPaginatorModule,
            material_1.MatSortModule,
            material_1.MatDialogModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            material_1.MatSlideToggleModule,
            material_1.MatCheckboxModule,
            material_1.MatAutocompleteModule,
            material_1.MatRadioModule,
            flex_layout_1.FlexLayoutModule.withConfig({ addFlexToParent: false }),
            bottom_sheet_1.MatBottomSheetModule,
            material_1.MatTooltipModule,
            material_1.MatSelectModule,
            material_1.MatDatepickerModule,
            material_1.MatNativeDateModule,
        ],
        declarations: [
            topnav_component_1.TopnavComponent,
            sidebar_component_1.SidebarComponent,
            layout_component_1.LayoutComponent,
            dashboard_component_1.DashboardComponent,
            users_component_1.UsersComponent,
        ],
        exports: [],
        providers: [],
    })
], PagesModule);
exports.PagesModule = PagesModule;
//# sourceMappingURL=pages.module.js.map