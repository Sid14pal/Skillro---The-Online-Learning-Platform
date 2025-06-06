import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteStatusService } from '../../services/route-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrl: './thankyou.component.css'
})
export class ThankyouComponent {
  cartItems: any[] = [];
  orderId: any = '';
  email: string = '';
  passwordForm!: FormGroup;
  showPassword: boolean = false;

  constructor(
    private firestore: AngularFirestore,
    private routeStatusService: RouteStatusService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) {
    this.routeStatusService.hideHeader = true;
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loadCartItems();
  }

  loadCartItems(): void {
    this.firestore.collection('cart').snapshotChanges().subscribe(snapshot => {
      this.cartItems = snapshot.map(doc => {
        const data = doc.payload.doc.data() as { [key: string]: any };
        this.orderId = Math.floor((Math.random() * 1000000) + 1);
        return { ...data };
      });
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((sum, item) => {
      const price = parseFloat(item.price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
  }

  createAccount() {
    const password = this.passwordForm.value.password;

    if (!this.email || !password) {
      this.snackBar.open('Email or password is missing.', 'Close', { duration: 4000, panelClass: ['danger'] });
      return;
    }

    this.auth.createUserWithEmailAndPassword(this.email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          this.saveCartForUser(user.uid);
          console.log(user);
        }
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          this.loginExistingUser(this.email, password);
        } else {
          this.snackBar.open('Signup failed: ' + error.message, 'Close', { duration: 4000, panelClass: ['danger'] });
        }
      });
  }

  loginExistingUser(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (user) {
          this.saveCartForUser(user.uid);
        }
      })
      .catch(error => {
        this.snackBar.open('Login failed: ' + error.message, 'Close', { duration: 4000, panelClass: ['danger'] });
      });
  }

  saveCartForUser(uid: string) {
    this.firestore.collection('userCarts').doc(uid).set({
      cart: this.cartItems,
      email: this.email,
      timestamp: new Date()
    }).then(() => {
      this.snackBar.open('Account created and cart saved!', 'Close', { duration: 4000, panelClass: ['success'] });
    //  this.router.navigate(['/student-dashboard']);
    }).catch(error => {
      this.snackBar.open('Error saving cart: ' + error.message, 'Close', { duration: 4000, panelClass: ['danger'] });
    });
  }
}
