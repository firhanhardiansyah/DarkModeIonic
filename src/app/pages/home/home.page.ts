import {Component, OnInit} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../../components/popover/popover.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) {
  }

  ngOnInit() {
  }

  async presentPopover(event: Event) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event
    });

    await popover.present();
  }

}
