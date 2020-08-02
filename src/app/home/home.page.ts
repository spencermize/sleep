import { Component, OnInit } from '@angular/core';
import { setHours, isAfter, isBefore, setMinutes } from 'date-fns';

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
	public morningMinute = 15;
	public editing = true;
	constructor() { }

	ngOnInit() {
		setInterval( () => {
			const now = new Date();
			const night = setMinutes(setHours(new Date(), this.nightHour), this.nightMinute);
			const morning = setMinutes(setHours(new Date(), this.morningHour), this.morningMinute);

			if (isBefore(morning, night)) { // this is an overnight alarm
				if (isAfter(now, night) || isBefore(now, morning)) {
					this.status = false;
				} else {
					this.status = true;
				}
			} else {
				if (isAfter(now, night) && isBefore(now, morning)) {
					this.status = false;
				} else {
					this.status = true;
				}	
			}

		}, 500);
	}

	stopPropagation(event) {
		event.stopPropagation();
	}
}
