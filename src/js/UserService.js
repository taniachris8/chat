const url = `https://server-for-chat-sh2y.onrender.com`;

export default class UserService {
  //   list(callback) {
  //     fetch(`${url}/?method=allTickets`)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((tickets) => {
  //         if (callback) callback(tickets);
  //       })
  //       .catch((err) => console.error(err));
  //   }

  //   get(id, callback) {
  //     fetch(`${url}/?method=ticketById&id=${id}`, {
  //       method: "GET",
  //       headers: { "Content-Type": "application/json" },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((ticket) => {
  //         if (callback) callback(ticket);
  //       })
  //       .catch((err) => console.error(err));
  //   }

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

  //   update(id, data, callback) {
  //     fetch(`${url}/?method=updateById&id=${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then((tickets) => {
  //         if (callback) callback(tickets);
  //       })
  //       .catch((err) => console.error(err));
  //   }

  //   delete(id, callback) {
  //     fetch(`${url}/?method=deleteById&id=${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error: ${response.status}`);
  //         }
  //         if (callback) callback();
  //       })
  //       .catch((err) => console.error(err));
  //   }
}
