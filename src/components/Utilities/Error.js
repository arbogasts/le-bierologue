import React from "react";
import { Alert } from "react-bootstrap";

const Error = props => {
    return (
        <div>
            <Alert variant="danger" className="mt-4">
                <Alert.Heading>Erreur survenue !</Alert.Heading>
                <p>
                    Une erreur est survenue, veuillez réessayez plus tard.
                </p>
            </Alert>
        </div>
    );
};

export default Error;