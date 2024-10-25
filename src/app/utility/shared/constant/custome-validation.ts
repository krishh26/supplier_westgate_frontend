import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms"

export class CustomValidation {
    static MatchValidator(source: string, target: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const sourceCtrl = control.get(source);
            const targetCtrl = control.get(target);

            return sourceCtrl && targetCtrl && sourceCtrl.value != targetCtrl.value
                ? { mismatch: true }
                : null;
        }
    }

    NumberOnly(event: any): boolean {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            return false;
        }
        return true;
    }
}
