import { GoogleLogin } from "@react-oauth/google";
import { authAPI } from "../api/auth/api";

export default function GoogleSignIn() {
  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        if (!credentialResponse.credential) return;

        try {
          const response = await authAPI.googleLogin(
            credentialResponse.credential,
          );

          console.log(response);
        } catch (error) {
          console.error(error);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
