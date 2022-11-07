import { BACKEND_URL } from "../constants/constants";

export const editProfile = async (
  gi: string,
  so: string,
  bio: string,
  name: string,
  id: number
) => {
  //sends input to backend and waits for approval
  await fetch(`${BACKEND_URL}/users/edit/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      genderIdentity: gi,
      sexualOrientation: so,
      userBio: bio,
      username: name
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    //once a response is received it decides if it is a good response or not
  })
    .then(response => {
      // If we get an "ok" message, return the json
      if (response.ok) {
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
    .catch(error => {
      console.warn("Something went wrong.", error);
    });
};
