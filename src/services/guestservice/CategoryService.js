export default {
    findBySupCategoryId: (id) => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/category/supcate/" + id, requestOptions);
    },
};
