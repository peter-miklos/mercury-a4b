import { TestBed, inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormControlService } from './form-control.service';

describe('FormControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [FormControlService]
    });
  });

  it('should ...', inject([FormControlService], (service: FormControlService) => {
    expect(service).toBeTruthy();
  }));
});
