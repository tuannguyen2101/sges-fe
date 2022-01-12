class ForgotPasswordService {
    forgotpassword = (email) => {
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "email": email,
});

var requestOptions = {
  method: 'PUT',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8080/fogotpass", requestOptions);
}
}
export default new ForgotPasswordService();