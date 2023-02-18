import axios from "axios";
const API_URL = "http://localhost:5051/";
export const forgotPassword = (data, callback, errorcallback) => {
  axios
    .patch(API_URL + "user/forgotPassword", data, {
      headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const getAllUser = (callback, errorcallback) => {
  axios
    .get(API_URL, {
      headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const getAllBlog = (callback, errorcallback) => {
  axios
    .get(API_URL, {
      headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const getAllProduct = (callback, errorcallback) => {
  axios
    .get(API_URL, {
      headers: { Authorization: "Basic " + localStorage.getItem("id_token") },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};

export const deleteUsr = (uid, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("id_token"),
      },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteAllUsr = (usr, token, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      data: usr,
      headers: { Authorization: `Basic ${token}` },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteCat = (uid, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("id_token"),
      },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteAllCat = (usr, token, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      data: usr,
      headers: { Authorization: `Basic ${token}` },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteBlog = (uid, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("id_token"),
      },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteAllBlog = (usr, token, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      data: usr,
      headers: { Authorization: `Basic ${token}` },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteProduct = (uid, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      headers: {
        Authorization: "Basic " + localStorage.getItem("id_token"),
      },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
export const deleteAllPro = (usr, token, callback, errorcallback) => {
  axios
    .delete(API_URL, {
      data: usr,
      headers: { Authorization: `Basic ${token}` },
    })
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};
