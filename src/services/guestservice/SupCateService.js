export default {
    findAll: () => {
        var requestOptions = {
            method: "GET",
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/supcate", requestOptions);
    },
};
