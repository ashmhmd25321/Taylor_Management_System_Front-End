import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDepressionComponent } from './no-depression.component';

describe('NoDepressionComponent', () => {
  let component: NoDepressionComponent;
  let fixture: ComponentFixture<NoDepressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoDepressionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoDepressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
