import axios from "axios";

const myApi = axios.create({ baseURL: "http://localhost:5005" });

//Login
myApi.getUserInfo = function () {
  return myApi
    .getUserInfo("/auth/verify")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
};

//signup
myApi.signup = function (userInfo) {
  return myApi
    .post("/auth/signup", userInfo)
    .then((response) => response)
    .catch((error) => error);
};

//We add the authorization code to axios requests if there's a token stored in loacal storage.
myApi.interceptors.request.use((request) => {
  const token = localStorage.getItem("authToken");
  if (!token) return request;
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});

export default myApi;
