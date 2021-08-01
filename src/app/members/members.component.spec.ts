import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberesComponent } from './members.component';

describe('MemberesComponent', () => {
  let component: MemberesComponent;
  let fixture: ComponentFixture<MemberesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
