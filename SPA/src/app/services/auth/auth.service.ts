import { Injectable } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthContext } from '../model/auth-context';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user: User;
  private _loginChangedSubject = new Subject<boolean>();

  loginChanged = this._loginChangedSubject.asObservable();
  authContext: AuthContext;

  constructor(private _httpClient: HttpClient) {
    const stsSettings = {
      authority: environment.stsAuthority,
      client_id: environment.clientId,
      redirect_uri: `${environment.clientRoot}signin-callback`,
      scope: 'openid profile projects-api',
      response_type: 'code',
      post_logout_redirect_uri: `${environment.clientRoot}signout-callback`,
      automaticSilentRenew: true,
      silent_redirect_uri: `${environment.clientRoot}assets/silent-callback.html`
      // metadata: {
      //   issuer: `${environment.stsAuthority}`,
      //   authorization_endpoint: `${environment.stsAuthority}authorize?audience=projects-api`,
      //   jwks_uri: `${environment.stsAuthority}.well-known/jwks.json`,
      //   token_endpoint: `${environment.stsAuthority}oauth/token`,
      //   userinfo_endpoint: `${environment.stsAuthority}userinfo`,
      //   end_session_endpoint: `${environment.stsAuthority}v2/logout?client_id=${environment.clientId}&returnTo=${encodeURI(environment.clientRoot)}signout-callback`
      // }
    };
    this._userManager = new UserManager(stsSettings);
    this._userManager.events.addAccessTokenExpired(_ => {
      this._loginChangedSubject.next(false);
    });
    this._userManager.events.addUserLoaded(user => {
      if (this._user !== user) {
        this._user = user;
        this.loadSecurityContext();
        this._loginChangedSubject.next(!!user && !user.expired);
      }
    });

  }

  login() {
    return this._userManager.signinRedirect();
  }

  isLoggedIn(): Promise<boolean> {
    return this._userManager.getUser().then(user => {
      const userCurrent = !!user && !user.expired;
      if (this._user !== user) {
        this._loginChangedSubject.next(userCurrent);
      }
      if (userCurrent && !this.authContext) {
        this.loadSecurityContext();
      }
      this._user = user;
      return userCurrent;
    });
  }

  completeLogin() {
    return this._userManager.signinRedirectCallback().then(user => {
      this._user = user;
      this._loginChangedSubject.next(!!user && !user.expired);
      return user;
    });
  }

  logout() {
    this._userManager.signoutRedirect();
  }

  completeLogout() {
    this._user = null;
    this._loginChangedSubject.next(false);
    return this._userManager.signoutRedirectCallback();
  }

  getAccessToken() {
    return this._userManager.getUser().then(user => {
      if (!!user && !user.expired) {
        return user.access_token;
      }
      else {
        return null;
      }
    });
  }

  loadSecurityContext() {
    this._httpClient
      .get<AuthContext>(`${environment.apiRoot}Projects/AuthContext`)
      .subscribe(
        context => {
          this.authContext = new AuthContext();
          this.authContext.claims = context.claims;
          this.authContext.userProfile = context.userProfile;
        },
        error => console.error(error)
      );
  }

}
