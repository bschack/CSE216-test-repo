import { BACKEND_URL } from "../constants/constants";

export const getUser = async (uid: number) => {
  let profileData;

  await fetch(`${BACKEND_URL}/users/${uid}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    //once a response is received it decides if it is a good response or not
  })
    .then(response => {
      // If we get an "ok" message, return the json
      if (response.ok) {
        // window.sessionStorage.setItem("user_logged_in", "true");
        return Promise.resolve(response.json());
      } else {
        // Otherwise, handle server errors with a detailed popup message
        console.warn(
          `The server replied not ok: ${response.status}\n` +
            response.statusText
        );
      }
      return Promise.reject(response);
    })
    .then(data => {
      profileData = data;
    })
    .catch(error => {
      console.warn("Something went wrong.", error);
      throw new Error("There was a problem getting this user's info...");
    });

  return profileData;
};
