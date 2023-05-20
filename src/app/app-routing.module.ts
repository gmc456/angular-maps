import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { BrowserModule } from '@angular/platform-browser';
import { RoomComponent } from './components/room/room.component';
import { BuildingComponent } from './components/building/building.component';

//const routes: Routes = [];

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent }, 
  { path: 'about', component: AboutComponent },
  { path: 'building', component: BuildingComponent }, 
  { path: 'room', component: RoomComponent }, 
  { path: '', pathMatch: 'full', redirectTo: 'home' }, 
  { path: '**', pathMatch: 'full', redirectTo: 'home' }, 
];

@NgModule({
  //imports: [RouterModule.forRoot(routes)],
  imports: [BrowserModule, RouterModule.forRoot(ROUTES, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
