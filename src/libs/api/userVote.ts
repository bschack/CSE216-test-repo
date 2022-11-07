import { BACKEND_URL } from "../constants/constants";

type voteType = {
  pid: number;
  type: "like" | "dislike";
};

export const userVote = async ({ pid, type }: voteType) => {
  const shk = window.sessionStorage.getItem("shk") || "";

  await fetch(`${BACKEND_URL}/posts/${type}/${pid}`, {
    method: "PUT",
    body: JSON.stringify({
      sessionHash: shk
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    //once a response is received
  })
    .then(response => {
      // If we get an "ok" message, return the json
      if (response.ok) {
        // return response.json();
        return Promise.resolve(response.json());
      } else {
        // Otherwise, handle server errors with a detailed popup message
        console.warn(
          `The server replied not ok: ${response.status}\n` +
            response.statusText
        );
      }
      // return response;
      return Promise.reject(response);
    })
    .catch(error => {
      console.warn("Something went wrong.", error);
    });
};
