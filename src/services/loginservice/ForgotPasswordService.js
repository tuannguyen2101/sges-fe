class ForgotPasswordService {
  forgotpassword = (email) => {
    var requestOptions = {
      method: 'PUT',
      redirect: 'follow'
    };
    
    return (fetch("http://localhost:8080/fogotpass?email="+email, requestOptions));
    
  }
}
export default new ForgotPasswordService();