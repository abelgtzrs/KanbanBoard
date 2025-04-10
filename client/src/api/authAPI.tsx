import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
}

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) {
      let errorMessage = `Login failed with status: ${response.status}`;
      try {
        const errorBody = await response.json();
        errorMessage = errorBody.message || errorMessage;
      } catch (e) {}
      throw new Error(errorMessage);
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error: any) {
    console.error("Login API call failed:", error);
    throw error;
  }
};

export { login };
