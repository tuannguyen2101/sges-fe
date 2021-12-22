let base64 = require("base-64");
class CategoryService {
    findAll = (n, s) => {
        if (n === undefined) {
            n = 0;
        }
        if (s === undefined) {
            s = 100;
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

    delete = (id) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=2062E42F9947801BCF060BD635705CFF");

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };
        return fetch(`http://localhost:8080/staff/category/${id}`, requestOptions);
    };
}

export default new CategoryService();
