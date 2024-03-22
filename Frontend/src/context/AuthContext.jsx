import { createContext, useContext, useEffect, useState } from "react";
import cookie from "js-cookie";
import axios from "axios";

const AuthContext = createContext();

const TOKEN_STORAGE_KEY = "authToken";

const AuthContextProvider = ({ children }) => {
  const [hasToken, setHasToken] = useState(() => {
    // Überprüfen, ob ein Token im Local Storage vorhanden ist
    return localStorage.getItem(TOKEN_STORAGE_KEY) !== null;
  });
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [emailSignUp, setEmailSignUp] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordSignUp, setPasswordSignUp] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isCreateCardsClicked, setIsCreateCardsClicked] = useState(false);
  const [userId, setUserId] = useState("");
  const [savedStudySets, setSavedStudySets] = useState([]);
  const [nickName, setNickName] = useState("");
  const [successLoginWindow, setSuccessLoginWindow] = useState(false);
  const [successSignUpWindow, setSuccessSignUpWindow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const backendApiUrl = import.meta.env.VITE_SERVER_URL;

  const resetMessages = () => {
    setMsg("");
    setError("");
  };

  const setErrorMessages = (error) => {
    // debugger;
    if (error.response) {
      setError(error.response.data.error);
    } else {
      setError(error.message);
    }
  };

  // const signUpHandler = async (e) => {
  //   e.preventDefault();

  //   resetMessages();

  //   try {
  //     const resp = await axios.post(`${backendApiUrl}/register`, {
  //       email: emailSignUp,
  //       password: passwordSignUp,
  //       firstName,
  //       lastName,
  //       nickName
  //     });
  //     console.log("Erfolgreich registriert:", resp.data);
  //     setEmailSignUp("");
  //     setPasswordSignUp("");
  //     setMsg("Du hast dich erfolgreich registriert.");
  //   } catch (error) {
  //     setErrorMessages(error);
  //     console.log("error while signing up:", error);
  //   }
  // };

  const signUpHandler = async (e) => {
    e.preventDefault();
    resetMessages();
    setTimeout(() => {
      setSuccessSignUpWindow(true);
  }, 700); 
    
    try {
      const resp = await axios.post(`${backendApiUrl}/register`, {
        email: emailSignUp,
        password: passwordSignUp,
        firstName,
        lastName,
        nickName
      });
      console.log("Erfolgreich registriert:", resp.data);
      setEmailSignUp("");
      setPasswordSignUp("");
      setMsg("Du hast dich erfolgreich registriert.");
      setIsLoading(true);
    } catch (error) {
      setErrorMessages(error);
      console.log("error while signing up:", error);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const email = emailLogin;
    const password = passwordLogin;
    resetMessages();
   
    try {
      const resp = await axios.post(
        `${backendApiUrl}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
   
      setMsg(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
      console.log(`Erfolgreich eingeloggt: ${email}. JWT erhalten.`);
      // Token im Local Storage speichern
      localStorage.setItem(TOKEN_STORAGE_KEY, resp.data.token);
      setHasToken(true);
      setEmailLogin("");
      setPasswordLogin("");
      setSuccessLoginWindow(true);
    } catch (error) {
      setSuccessLoginWindow(true);
      setErrorMessages(error);
      console.log("error while logging in:", error);
    }
  };

  const logoutHandler = async (e) => {
    resetMessages();
    try {
      const resp = await axios.post(
        `${backendApiUrl}/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Erfolgreich ausgeloggt", resp.data);
      setMsg("Erfolgreich ausgeloggt.");
      // Token aus dem Local Storage entfernen
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setHasToken(false);
      setShowLoginForm(false);
      setShowSignUpForm(false);
    } catch (error) {
      setErrorMessages(error);
    }
  };

  const handleIfUserHasToken = () => {
    let JWTinfocookie = cookie.get("JWTinfo");
    console.log("JWTinfo cookie", JWTinfocookie); // => j:{"expires":"2024-01-25T09:26:05.444Z","email":"Anna@dci.org"}
    if (!JWTinfocookie) return;
    JWTinfocookie = JWTinfocookie.replace("j:", "");
    const cookieValueObj = JSON.parse(JWTinfocookie);
    console.log("cookieValueObj", cookieValueObj);
    const expirationInMs = new Date(cookieValueObj.expires) - new Date();
    console.log("JWT läuft ab in", expirationInMs / 1000, "Sekunden");

    if (expirationInMs <= 0) return;

    setHasToken(true);
    setUser({ email: cookieValueObj.email });
    setMsg(`Eingeloggter User: ${cookieValueObj.email}.`);
  };

  const userInfoHandler = async () => {
    resetMessages();

    try {
      const resp = await axios.get(`${backendApiUrl}/user`, {
        withCredentials: true,
      });
      console.log("resp.data:", resp.data);
       setMsg(resp.data);
    } catch (error) {
      setErrorMessages(error);
    }
  };

  useEffect(() => {
    handleIfUserHasToken();
  }, []);

  const getUserInfo = async () => {
    if (!hasToken) return;
    try {
      const response = await axios.get(`${backendApiUrl}/user`, {
        withCredentials: true,
      });
      setUser(response.data);
      setUserId(response.data._id);
      setSavedStudySets(response.data.savedStudySets);
    } catch (error) {
      setErrorMessages(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        hasToken,
        setHasToken,
        msg,
        setMsg,
        user,
        setUser,
        error,
        setError,
        loginHandler,
        signUpHandler,
        logoutHandler,
        userInfoHandler,
        showLoginForm,
        setShowLoginForm,
        showSignUpForm,
        setShowSignUpForm,
        emailSignUp,
        setEmailSignUp,
        emailLogin,
        setEmailLogin,
        passwordSignUp,
        setPasswordSignUp,
        passwordLogin,
        setPasswordLogin,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        getUserInfo,
        isCreateCardsClicked,
        setIsCreateCardsClicked,
        userId, setUserId,
        savedStudySets, setSavedStudySets,
        nickName, setNickName,
        successLoginWindow, setSuccessLoginWindow,
        successSignUpWindow, setSuccessSignUpWindow,
        isLoading, setIsLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };