import { PRODUCT_API } from "../../constants/api";

// let base64 = require("base-64")
class ProductService {
    findAll = (page, cateId, status, nameQuery) => {
        var myHeaders = new Headers();
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        return fetch(PRODUCT_API + "?page=" + page + "&cateId=" + cateId + "&status=" + status + "&nameQuery=" + nameQuery, requestOptions);
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
        var token = localStorage.getItem("token"); 
        myHeaders.append("Authorization", "Bearer " + token);
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
