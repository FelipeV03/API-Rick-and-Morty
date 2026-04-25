import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDetailModalComponent } from './character-detail-modal.component';

describe('CharacterDetailModalComponent', () => {
  let component: CharacterDetailModalComponent;
  let fixture: ComponentFixture<CharacterDetailModalComponent>;

  beforeEach(async) {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDetailModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
