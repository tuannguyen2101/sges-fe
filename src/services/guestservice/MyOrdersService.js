let base64 = require("base-64");

class MyOrdersService {
    findAll = (username, password) => {
        let myHeaders = new Headers();
        myHeaders.append("Cookie", "JSESSIONID=32AA9655D2E2801D58EBE81A961C4AE6");
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        let requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "http://localhost:8080/guest/order?username=" + username + "&password=" + password,
            requestOptions
        );
    };

    findAllByAccountAndStatus = (user_id, status, n, s) => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Cookie", "JSESSIONID=4D553BE702996053945F7286D5041992");

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            return fetch(
                "http://localhost:8080/guest/order/page?userId=" +
                    user_id +
                    "&status=" +
                    status +
                    "&n=" +
                    n +
                    "&s=" +
                    s,
                requestOptions
            );
        }
    };

    findAllDetailByOderId = (oId) => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "JSESSIONID=6F82CF11FD8EB5C5B7CAC2ED556CBAEF");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/listorderdetail?oId=" + oId, requestOptions);
    };

    huyDatHang = (donHuy) => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "JSESSIONID=8318851476E7D0D92BBA4CEBD4AB6D1F");

            var raw = JSON.stringify(donHuy);

            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            return fetch("http://localhost:8080/guest/order", requestOptions);
        }
    };

    addOrder = (order) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=32AA9655D2E2801D58EBE81A961C4AE6");
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);
        let raw = JSON.stringify(order);

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/order", requestOptions);
    };

    addOrderDetail = (orderDetails) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=32AA9655D2E2801D58EBE81A961C4AE6");

        let raw = JSON.stringify(orderDetails);

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/orderdetail", requestOptions);
    };

    removeOrder = (username, password, order) => {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=32AA9655D2E2801D58EBE81A961C4AE6");
        var token = localStorage.getItem("token");
        myHeaders.append("Authorization", "Bearer " + token);

        var raw = JSON.stringify(order);
        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/order", requestOptions);
    };
}

export default new MyOrdersService();
