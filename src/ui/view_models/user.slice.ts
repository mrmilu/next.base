export interface UserState {
  logged: boolean;
  setLogged(logged: boolean): void;
  logout(): void;
  login(): void;
}
