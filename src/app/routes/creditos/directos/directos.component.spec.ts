import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectosComponent } from './directos.component';

describe('DirectosComponent', () => {
  let component: DirectosComponent;
  let fixture: ComponentFixture<DirectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
