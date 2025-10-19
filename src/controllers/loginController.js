class LoginController {
  constructor() {
    this.username = '';
    this.password = '';
  }

  set username(value) {
    this._username = value;
//    console.log('Username updated:', value); // Debug
  }

  get username() {
    return this._username;
  }

  set password(value) {
    this._password = value;
//    console.log('Password updated:', value); // Debug
  }

  get password() {
    return this._password;
  }

  submit() {
    if (!this.username || !this.password) {
      alert('Please fill all fields');
    } else {
      console.log('Logging in with:', { username: this.username, password: this.password });
      // Simulate API call or navigation
    }
  }
}

// Ensure global access
if (typeof window !== 'undefined') {
  window.LoginController = new LoginController();
}

export default window.LoginController;