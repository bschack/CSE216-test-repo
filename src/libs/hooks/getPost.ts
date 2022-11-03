import { BACKEND_URL } from "../constants/constants";

export const getPost = async (id: number) => {
  let post;

  const shk = window.sessionStorage.getItem("shk") || "";

  await fetch(`${BACKEND_URL}/posts/${id}?sessionKey=${shk}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(response => {
      // If we get an "ok" message, clear the form
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
      // console.log(data);
      post = data;
    })
    .catch(error => {
      console.warn("Something went wrong.", error);
    });

  return post;
};
