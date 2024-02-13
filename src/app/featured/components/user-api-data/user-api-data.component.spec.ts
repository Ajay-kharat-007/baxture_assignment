import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserApiDataComponent } from './user-api-data.component';

describe('UserApiDataComponent', () => {
  let component: UserApiDataComponent;
  let fixture: ComponentFixture<UserApiDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserApiDataComponent]
    });
    fixture = TestBed.createComponent(UserApiDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
