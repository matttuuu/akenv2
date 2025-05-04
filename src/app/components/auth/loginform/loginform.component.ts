import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-loginform',
  templateUrl: './loginform.component.html',
  styleUrl: 'loginform.component.css',
})
export class LoginformComponent implements OnInit {


  public formLogin : FormGroup;

  constructor(
    private authService: AuthService)
    {
      this.formLogin = new FormGroup({
        email: new FormControl(),
        password: new FormControl (),
      })

    }
  

  ngOnInit(): void { 
  }


  onSubmit(){
    this.authService.login(this.formLogin.value)
    .then(response => {
      console.log (response);
    })
    .catch(error => console.log(error));
  }
}
