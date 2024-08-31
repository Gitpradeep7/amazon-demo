import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadpartComponent } from './headpart.component';

describe('HeadpartComponent', () => {
  let component: HeadpartComponent;
  let fixture: ComponentFixture<HeadpartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeadpartComponent]
    });
    fixture = TestBed.createComponent(HeadpartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
