import { Component, OnInit } from '@angular/core';
import { PowerManagement } from '@ionic-native/power-management/ngx';
import { setHours, addDays, isAfter, isBefore, setMinutes } from 'date-fns';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
	public status = true;
	public nightHour = 20;
	public nightMinute = 0;
	public morningHour = 7;
	public morningMinute = 30;
	public editing = true;
	constructor(private powerManagement: PowerManagement) { }

	ngOnInit() {
		this.powerManagement.acquire();

		setInterval( () => {
			const now = new Date();
			const night = setMinutes(setHours(new Date(), this.nightHour), this.nightMinute);
			const morning = addDays(setMinutes(setHours(new Date(), this.morningHour), this.morningMinute), 1);

			if (isAfter(now, night) && isBefore(now, morning)) {
				this.status = false;
				this.powerManagement.dim();
			} else {
				this.status = true;
				this.powerManagement.acquire();
			}
		}, 500);
	}

	stopPropagation(event) {
		event.stopPropagation();
	}
}
