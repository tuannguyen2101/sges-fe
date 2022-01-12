class SignupService {
    
    signup = (username, password, fullname, email, photo, status) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0MTM1NjI2MywiZXhwIjoxNjQxOTYxMDYzLCJ1c2VyIjoie1wiaWRcIjoxLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJExuNTREcWV1dm1kN04wcVN6U3BrWHU3ZHQueG1NYnNLNWMzdTU1SHlkbHE4RTM2OVA2cXQ2XCIsXCJmdWxsbmFtZVwiOlwiRG9uIFF1aWpvdGVcIixcImVtYWlsXCI6XCJkb25xdWlqb3RlQGdtYWlsLmNvbVwiLFwicGhvdG9cIjpudWxsLFwic3RhdHVzXCI6MSxcInByb3ZpZGVyXCI6bnVsbH0ifQ.3diya6rE6RQrPAfNh-Tk-KEJniE2p7GmHa4OPbB7UKyNBhBzo9ChYHt6ttbtnSeCSnIJdDSvyODTzAFwTvA-RA");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=A46E964B15F47F82D5C7019B0D08937B");

        var raw = JSON.stringify({
            "username": username,
            "password": password,
            "fullname": fullname,
            "email": email,
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