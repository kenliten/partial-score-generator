import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: UntypedFormControl = new UntypedFormControl('', Validators.email);
  password: UntypedFormControl = new UntypedFormControl('', Validators.required);
  working = false;
  @ViewChild('emailInput') emailInput!: any;
  @ViewChild('passwordInput') passwordInput!: any;

  constructor(
    private auth: Auth,
    private router: Router,
    private sb: MatSnackBar,
    ) {
  }

  ngOnInit(): void {
  }

  onKeyUp (e: any) {
    if (e.key === 'Enter' && this.email.valid && this.password.valid) {
      this.login();
    }
  }

  login() {
    this.working = true;
    const email = this.email.value;
    const password = this.password.value;
    signInWithEmailAndPassword(this.auth, email, password).then(() => {
      // docData<UserProfile>(
      //   doc(this.firestore, 'users', cred.user.uid) as DocumentReference<UserProfile>
      //   ).subscribe(profile => {
      //   const now = Timestamp.now();
      //   if (profile.expiration.valueOf() < now.valueOf()) {
      //     signOut(this.auth);
      //   }
      // })
      this.router.navigate(['/dashboard']);
    }).catch(err => {
      this.sb.open(err.message, 'Cerrar', { duration: 2500 });
      this.working = false;
    });
  }

  get emailErrors(): string {
    if (this.email.hasError('required')) {
      return 'Tienes que proveer un email';
    } else if (this.email.hasError('email')) {
      return 'Este email no es valido.';
    }
    return '';
  }

}
