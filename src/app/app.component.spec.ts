/* tslint:disable:no-unused-variable */

import { ComponentFixture, ComponentFixtureAutoDetect, TestBed, async } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [
        MaterialModule.forRoot(), FormsModule,
        HttpModule, RouterTestingModule
      ],
      providers: [
        { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.debugElement.nativeElement;
    app = fixture.debugElement.componentInstance;
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'mercury-a4'`, async(() => {
    expect(app.title).toEqual('mercury-a4');
  }));

  it('should render title in a h1 tag', async(() => {
    expect(compiled.querySelector('md-toolbar').textContent).toContain('mercury-a4');
  }));

  it('should render search icon in toolbar', async(() => {
    expect(compiled.querySelector('md-icon#search-icon').innerText).toBe('search');
  }));
});
