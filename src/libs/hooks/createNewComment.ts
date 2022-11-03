import { BACKEND_URL } from "../constants/constants";

export const createNewComment = async (message: string, pid: number) => {
  const shk = window.sessionStorage.getItem("shk") || "";
  //sends input to backend and waits for approval
  await fetch(`${BACKEND_URL}/comments/new/${pid}`, {
    method: "POST",
    body: JSON.stringify({
      content: message,
      sessionHash: shk
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
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.warn("Something went wrong.", error);
    });
};
