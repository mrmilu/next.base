export interface UserStateViewModel {
  logged: boolean;
  setLogged(logged: boolean): void;
  logout(): void;
  login(): void;
}
