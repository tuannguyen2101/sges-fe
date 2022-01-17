class SignupService {
    
    signup = (username, password, fullname, email, photo, status) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer ");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=A46E964B15F47F82D5C7019B0D08937B");

        var raw = JSON.stringify({
            "username": username,
            "email": email,
            "fullname": fullname,
            "password": password,
            "photo": photo,
            "status": status,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        return fetch("http://localhost:8080/signup", requestOptions);

    }
}
export default new SignupService();