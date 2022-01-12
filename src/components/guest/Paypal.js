import React, { useRef, useEffect } from "react";
import { NotiError, NotiSuccess } from "../noti/Noti";

export default function Paypal(props) {
    const paypal = useRef();

    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "",
                                amount: {
                                    currency_code: "USD",
                                    value: Math.round(props.totalPay),
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    if (order.status === "COMPLETED") {
                        const od = await props.orderAndPay(1);
                    }
                    console.log(order);
                    NotiSuccess("Thanh toán thành công!");
                },
                onError: (err) => {
                    console.log(err);
                    NotiError("Lỗi thanh toán!");
                    NotiError("Đơn hàng chưa được tạo!");
                },
            })
            .render(paypal.current);
    }, []);

    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}
