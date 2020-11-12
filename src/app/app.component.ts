import {Component, OnDestroy, QueryList, Renderer2, ViewChildren} from '@angular/core';

import {AlertController, IonRouterOutlet, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {

  backButtonSubscription;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private renderer: Renderer2,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.statusBar.backgroundColorByHexString(`#33000000`);
    this.checkDarkMode();
    this.platform.ready().then(() => {
      this.backButton();
      this.splashScreen.hide();
    });
  }

  backButton() {
    this.backButtonSubscription = this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (this.router.url === '/home') {
          this.presentAlertConfirm();
        }
      });
    });
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: 'Confirm to exit app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          }
        },
        {
          text: 'Exit',
          handler: () => {
            navigator[`app`].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  checkDarkMode() {
    const check = localStorage.getItem('dark-mode');

    if (check === 'true') {
      this.renderer.setAttribute(document.body, 'color-theme', 'dark');
    } else if (check === 'false') {
      this.renderer.setAttribute(document.body, 'color-theme', 'light');
    }
  }
}
