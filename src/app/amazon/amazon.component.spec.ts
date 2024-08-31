import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmazonComponent } from './amazon.component';

describe('AmazonComponent', () => {
  let component: AmazonComponent;
  let fixture: ComponentFixture<AmazonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmazonComponent]
    });
    fixture = TestBed.createComponent(AmazonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
