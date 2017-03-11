import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';

const AUTH0_CLIENT_ID = 'gEA2gcQMBBRhDid5mRKXMRwBHmbtpshU';
const AUTH0_DOMAIN = 'spinksy.au.auth0.com';
const ID_TOKEN = 'id_token';

@Injectable()
export class AuthService {

  private lock = new Auth0Lock(AUTH0_CLIENT_ID, AUTH0_DOMAIN, {});

  constructor() { 

    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem(ID_TOKEN, authResult.idToken);
    });
  }

  signIn() { 
    this.lock.show() 
  };
  signOut() { 
    localStorage.removeItem(ID_TOKEN); 
  }

  authenticated() { 
    return tokenNotExpired(); 
  }

}
