import { BrowserModule } from '@angular/platform-browser';
import { Router, Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule,
  MatIconModule, MatListModule, MatGridListModule, MatCardModule,
  MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule,
  MatTabsModule, MatInputModule, MatStepperModule, MatStepperIntl, MatStepLabel, MatIcon, MatSelectModule, MatButtonToggle, MatButtonToggleModule, MatDialogModule
} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { ChambreComponentComponent } from './components/chambre-component/chambre-component.component';
import { AdminComponentComponent } from './components/admin-component/admin-component.component';
import { ComptableComponentComponent } from './components/comptable-component/comptable-component.component';
import { NgModule } from '@angular/core';
import { MainTableComponent } from './components/main-table/main-table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DepartementComponent } from './components/departement/departement.component';
import { RegionComponent } from './components/region/region.component';
import { AgentchambreComponent } from './components/agentchambre/agentchambre.component';
import { AgentgouvernanceComponent } from './components/agentgouvernance/agentgouvernance.component';
import { ArticleComponent } from './components/article/article.component';
import { ArtisanComponent } from './components/artisan/artisan.component';
import { ChambremetierComponent } from './components/chambremetier/chambremetier.component';
import { ClientComponent } from './components/client/client.component';
import { CommandeComponent } from './components/commande/commande.component';
import { CompagnonComponent } from './components/compagnon/compagnon.component';
import { CompteComponent } from './components/compte/compte.component';
import { DemandeComponent } from './components/demande/demande.component';
import { EntrepriseComponent } from './components/entreprise/entreprise.component';
import { FactureComponent } from './components/facture/facture.component';
import { GieComponent } from './components/gie/gie.component';
import { GouvernanceComponent } from './components/gouvernance/gouvernance.component';
import { PaiementComponent, PaiementDialogComponent } from './components/paiement/paiement.component';
import { PersonneComponent } from './components/personne/personne.component';
import { ProfessionComponent } from './components/profession/profession.component';
import { PublicationComponent } from './components/publication/publication.component';
import { RepertoireComponent } from './components/repertoire/repertoire.component';
import { RoleComponent } from './components/role/role.component';
import { SectionComponent } from './components/section/section.component';
import { TypearticleComponent } from './components/typearticle/typearticle.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { TraitementDemandeComponent, ConfirmationDialogComponent } from './components/traitement-demande/traitement-demande.component';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
const appRoutes: Routes = [
  { path: '', component: HomeComponentComponent },
  { path: 'departements', component: DepartementComponent },
  { path: 'chambre', component: ChambreComponentComponent },
  { path: 'admin', component: AdminComponentComponent },
  { path: 'artisans', component: ArtisanComponent },
  { path: 'demandes', component: DemandeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'traitement-demande', component: TraitementDemandeComponent },
  { path: 'comptable', component: ComptableComponentComponent },
  { path: 'paiements', component: PaiementComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    MainDashboardComponent,
    HomeComponentComponent,
    ChambreComponentComponent,
    AdminComponentComponent,
    ComptableComponentComponent,
    MainTableComponent,
    DepartementComponent,
    RegionComponent,
    AgentchambreComponent,
    AgentgouvernanceComponent,
    ArticleComponent,
    ArtisanComponent,
    ChambremetierComponent,
    ClientComponent,
    CommandeComponent,
    CompagnonComponent,
    CompteComponent,
    DemandeComponent,
    EntrepriseComponent,
    FactureComponent,
    GieComponent,
    GouvernanceComponent,
    PaiementComponent,
    PersonneComponent,
    ProfessionComponent,
    PublicationComponent,
    RepertoireComponent,
    RoleComponent,
    SectionComponent,
    TypearticleComponent,
    LoginComponent,
    TraitementDemandeComponent,
    ConfirmationDialogComponent,
    PaiementDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    HttpClientModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    RouterModule.forRoot(appRoutes),
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule,
    MatButtonToggleModule,
    CommonModule,
    MatDialogModule
  ],
  providers: [HttpClient, {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { displayDefaultIndicatorType: false }
  }],
  entryComponents: [
    ConfirmationDialogComponent, 
    PaiementDialogComponent
  ],
  bootstrap: [AppComponent]
  // , schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
