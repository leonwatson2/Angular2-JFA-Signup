import {provide, enableProdMode} from 'angular2/core';

import {bootstrap} from 'angular2/platform/browser';
import {SignUpComponent} from './jfa.signup.component';
import {HTTP_PROVIDERS, XHRBackend} from 'angular2/http';
import {UsersService} from './users.service';
import {MockBackend} from './mock-backend';

// enableProdMode();
bootstrap(SignUpComponent, 
	[
	HTTP_PROVIDERS,
	UsersService
	// provide(XHRBackend, {useClass:MockBackend})
	]);
