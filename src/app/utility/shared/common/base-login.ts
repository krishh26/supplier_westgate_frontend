export class BaseLogin {
    password = 'password';
    currentPassword = 'password';
    confirmPassword = 'password';
    showPassword = false;
    showConfPassword = false;
    showCurrentPassword = false;

    constructor() { }

    public showHidePass(): void {
        if (this.password === 'password') {
            this.password = 'text';
            this.showPassword = true;
        } else {
            this.password = 'password';
            this.showPassword = false;
        }
    }

    public showHideConfirmPass(): void {
        if (this.confirmPassword === 'password') {
            this.confirmPassword = 'text';
            this.showConfPassword = true;
        } else {
            this.confirmPassword = 'password';
            this.showConfPassword = false;
        }
    }

    public showHideCurrentPass(): void {
        if (this.currentPassword === 'password') {
            this.currentPassword = 'text';
            this.showCurrentPassword = true;
        } else {
            this.currentPassword = 'password';
            this.showCurrentPassword = false;
        }
    }
}