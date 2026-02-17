import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { addIcons } from 'ionicons';
import { 
  addCircle, 
  personOutline, 
  restaurantOutline, 
  timeOutline, 
  checkmarkCircleOutline 
} from 'ionicons/icons';

// REGISTRAZIONE MANUALE DELLE ICONE
addIcons({
  'add-circle': addCircle,
  'person-outline': personOutline,
  'restaurant-outline': restaurantOutline,
  'time-outline': timeOutline,
  'checkmark-circle-outline': checkmarkCircleOutline
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
