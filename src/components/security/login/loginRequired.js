import React from "react";

const loginRequired = (props) => {
    return (
        <div className="container p-5">
            <h1>{props.message}</h1>
        </div>
    );
};

export default loginRequired;
