class OrderService {
    getAll = (status, payment, name, from, to, number, size, direction) => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Cookie", "JSESSIONID=23C4A574E1A7306051D89587DAA05F59");

            var requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow",
            };

            return fetch(
                "http://localhost:8080/staff/order/tuannn/find?status=" +
                    status +
                    "&payment=" +
                    payment +
                    "&name=" +
                    name +
                    "&from=" +
                    from +
                    "&to=" +
                    to +
                    "&number=" +
                    number +
                    "&size=" +
                    size +
                    "&direction=" +
                    direction,
                requestOptions
            );
        }
    };

    capNhatDonHang = (donCapNhat) => {
        if (localStorage.getItem("token")) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Cookie", "JSESSIONID=8318851476E7D0D92BBA4CEBD4AB6D1F");

            var raw = JSON.stringify(donCapNhat);

            var requestOptions = {
                method: "PUT",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            return fetch("http://localhost:8080/guest/order", requestOptions);
        }
    };
}

export default new OrderService();
