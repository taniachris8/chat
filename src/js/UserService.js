const url = `https://server-for-chat-sh2y.onrender.com`;

export default class UserService {
  register(name, onSuccess, onError) {
    fetch(`${url}/new-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || `HTTP error: ${response.status}`);
          });
        }
        return response.json();
      })
      .then((result) => {
        if (result.status === "ok") {
          if (onSuccess) onSuccess(result.user);
        } else {
          if (onError) onError(result.message);
        }
      })
      .catch((err) => {
        if (onError) onError(err.message);
      });
  }
}
