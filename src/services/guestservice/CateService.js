class CateService {
    url = "http://localhost:8080/guest/category";

    findAll = () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        return fetch(this.url, requestOptions);
    };

    findBySupCategoryId = (id) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };
        return fetch("http://localhost:8080/guest/category/supcate/" + id, requestOptions);
    };
}

export default new CateService();
