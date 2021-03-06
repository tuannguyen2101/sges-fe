export default {
    findProduct: (cId, name, n, s, p, d) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        return fetch(
            "http://localhost:8080/guest/product?cId=" +
                cId +
                "&name=" +
                name +
                "&n=" +
                n +
                "&s=" +
                s +
                "&p=" +
                p +
                "&d=" +
                d,
            requestOptions
        );
    },
    findById: (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "JSESSIONID=4AB82BFF7A2600359723545A650A79AF");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/product/" + id, requestOptions);
    },
    findProductNew: () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/product/new", requestOptions);
    },
    timSanPhamBanChay: () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/product/banchay", requestOptions);
    },
};
