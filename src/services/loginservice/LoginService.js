export default {
    login: (username, password) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=394C400E2B0A4ACEFA363F2A5C6D50DC");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "http://localhost:8080/login?username=" + username + "&password=" + password,
            requestOptions
        );
    },

    authenticate: () => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Cookie", "JSESSIONID=C6B69B1366935F0C4E7CCAC8732291BA");

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            return fetch("http://localhost:8080/getProfile", requestOptions);
        }
    },
};
