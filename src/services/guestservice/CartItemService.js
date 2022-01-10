class CartItemService {
    getCartItem = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "JSESSIONID=76950324261A998C970D5FB832499756");

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/cart?id=" + id, requestOptions);
    };

    saveCartItem = (id, productId, productDetailId, quantity, accountId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "JSESSIONID=76950324261A998C970D5FB832499756");

        var raw = JSON.stringify({
            id: id,
            productId: productId,
            productDetailId: productDetailId,
            quantity: quantity,
            accountId: accountId,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/cart", requestOptions);
    };

    deleteCartItem = (id) => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "JSESSIONID=76950324261A998C970D5FB832499756");

        var requestOptions = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow",
        };

        return fetch("http://localhost:8080/guest/cart?id=" + id, requestOptions);
    };
}

export default new CartItemService();
