class GiaoHangNhanhService {
    getProvince = () => {
        var myHeaders = new Headers();
        myHeaders.append("token", "fe583f47-7029-11ec-9054-0a1729325323");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/province",
            requestOptions
        );
    };

    getDistrict = (province_id) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "fe583f47-7029-11ec-9054-0a1729325323");
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
                province_id,
            requestOptions
        );
    };

    getWard = (district_id) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "fe583f47-7029-11ec-9054-0a1729325323");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
                district_id,
            requestOptions
        );
    };

    getService = (to_district) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "fe583f47-7029-11ec-9054-0a1729325323");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=2413474&from_district=1455&to_district=" +
                to_district,
            requestOptions
        );
    };

    getFeeOfOrder = (to_district_id, to_ward_code, service_id, insurance_value, weight, height) => {
        var myHeaders = new Headers();
        myHeaders.append("token", "fe583f47-7029-11ec-9054-0a1729325323");
        myHeaders.append("shop_id", "2413474");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch(
            "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?from_district_id=" +
                "1458" +
                "&to_district_id=" +
                to_district_id +
                "&to_ward_code=" +
                to_ward_code +
                "&service_id=" +
                service_id +
                "&insurance_value=" +
                insurance_value +
                "&weight=" +
                weight +
                "&length=" +
                "40" +
                "&width=" +
                "30" +
                "&height=" +
                height,
            requestOptions
        );
    };
}

export default new GiaoHangNhanhService();
