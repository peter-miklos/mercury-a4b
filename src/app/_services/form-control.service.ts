import { Injectable } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class FormControlService {
  private form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  toFormGroup(person: any = {}) {
    let address = person.address || {};
    return this.fb.group({
        id: [person.id || ''],
        name: [person.name || '', [Validators.required, Validators.minLength(5)]],
        phone: [person.phone || '', [Validators.required, Validators.minLength(12)]],
        address: this.fb.group({
            street: [address.street || '', Validators.required],
            city: [address.city || '', Validators.required],
            state: [address.state || '', [Validators.required, Validators.minLength(2)]],
            zip: [address.zip || '', Validators.required],
        })
    });
  }
}
