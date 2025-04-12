import { JwtPayload, jwtDecode } from "jwt-decode";

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        return decoded;
      } catch (error) {
        console.error("Failed to decode token:", error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Failed to decode token for expiration check:", error);
      return true;
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem("id_token") || "";
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem("id_token", idToken);
    // TODO: redirect to the home page
    window.location.assign("/");
  }

  logout(): void {
    // TODO: remove the token from localStorage
    localStorage.removeItem("id_token");
    // TODO: redirect to the login page
    window.location.assign("/login");
  }
}

export default new AuthService();
