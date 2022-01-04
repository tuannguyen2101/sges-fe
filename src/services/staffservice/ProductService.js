import { PRODUCT_API } from "../../constants/api";

// let base64 = require("base-64")
class ProductService {
    findAll = (page, status, auth) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return fetch(PRODUCT_API + "?page=" + page + "&status=" + status, requestOptions);
    };

    changeStatus = (product, auth) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        product.status = Number(!product.status);
        var raw = JSON.stringify(product);
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        return fetch(PRODUCT_API, requestOptions);
    };

    addProduct = (product, auth) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(product);
        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        return fetch(PRODUCT_API, requestOptions);
    };

    updateProduct = (product, auth) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(product);
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        return fetch(PRODUCT_API, requestOptions);
    };

    addVersion = (listversion) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTY0MTExMDI4MywiZXhwIjoxNjQxNzE1MDgzLCJ1c2VyIjoie1wiaWRcIjoxLFwidXNlcm5hbWVcIjpcImFkbWluXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJExuNTREcWV1dm1kN04wcVN6U3BrWHU3ZHQueG1NYnNLNWMzdTU1SHlkbHE4RTM2OVA2cXQ2XCIsXCJmdWxsbmFtZVwiOlwiRG9uIFF1aWpvdGVcIixcImVtYWlsXCI6XCJkb25xdWlqb3RlQGdtYWlsLmNvbVwiLFwicGhvdG9cIjpudWxsLFwic3RhdHVzXCI6MX0ifQ.UV7YtaJAkhFZ2di4GunckLcfksDtzKAAeOCHeR2flaJ6dqFR9obM4yWoy4qFSPfYLjmvrqVsAt9KtB6cwiVS1w");
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=63D3A96529B5074EB38602B414380964");

        var raw = JSON.stringify(listversion);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        return fetch("http://localhost:8080/staff/product/add-list-detail", requestOptions)
    }


}

export default new ProductService();
