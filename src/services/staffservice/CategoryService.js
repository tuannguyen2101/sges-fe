let base64 = require("base-64");
class CategoryService {
    findAll = (auth, n, s) => {
        if (n === undefined) {
            n = 0;
        }
        if (s === undefined) {
            s = 10;
        }
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=2064BDCC88C1220073384EFE5F8D17EE");
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return fetch("http://localhost:8080/staff/category?n=" + n + "&s=" + s, requestOptions);
    };

    findById = (id, auth) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return fetch("http://localhost:8080/staff/category/" + id, requestOptions);
    };

    create = (newCategory) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=2064BDCC88C1220073384EFE5F8D17EE");
        var raw = JSON.stringify({
            name: newCategory.name,
            status: newCategory.status,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/staff/category", requestOptions);
    };

    update = (newData) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=2064BDCC88C1220073384EFE5F8D17EE");

        var raw = JSON.stringify({
            id: newData.id,
            name: newData.name,
            status: newData.status,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/staff/category", requestOptions);
    };
}

export default new CategoryService();
