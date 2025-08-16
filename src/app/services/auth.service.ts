import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        // // //Usuario logeado... /////QUITAR ESTOS CONSOLE LOGS EN PRODUCCION
        // console.log(user.uid);
        // console.log(user.email);
        // console.log(user.displayName);
      }
    });
  }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        console.log('Successfully Logged In');
        this.router.navigate(['/main']);
      })
      .catch((error) => console.log(error));
  }

  logout() {
    return signOut(this.auth)
      .then(() => {
        console.log('Successfully Logged Off');
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
