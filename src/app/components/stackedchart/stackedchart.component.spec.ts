import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackedchartComponent } from './stackedchart.component';

describe('StackedchartComponent', () => {
  let component: StackedchartComponent;
  let fixture: ComponentFixture<StackedchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackedchartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackedchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
