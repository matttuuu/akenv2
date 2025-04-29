import { Injectable } from '@angular/core';
import { Auth,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth,
    private router : Router
  ) { }

  register ({email, password}: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login ({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email,password )
    .then(()=>{
      console.log("Successfully Logged In")
      this.router.navigate(['/main'])
    })
    .catch(error => console.log(error))
    
  }

  logout(){
    return signOut(this.auth)
    
    .then(()=>{
      console.log("Successfully Logged Off")
      this.router.navigate(['/login'])
    })
    .catch(error => console.log(error))
  }
  
}
