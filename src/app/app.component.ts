import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private androidFullScreen: AndroidFullScreen
	) {
		this.initializeApp();

	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			
			this.androidFullScreen.isImmersiveModeSupported()
				.then(() => {
					console.log('Immersive mode supported');
					this.androidFullScreen.leanMode()
				})
		});
	}

	ngOnInit() {

	}
}
