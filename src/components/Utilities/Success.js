import React from "react";
import { Alert } from "react-bootstrap";

const Success = props => {
    return (
        <div>
            <Alert variant="success" className="mt-4">
                <Alert.Heading>Bière créée !</Alert.Heading>
                <p>
                    Félicitations, vous assez réussi à créer votre bière "{props.name}". <br/>
                    Votre bière va être traité par un modérateur pour validation.<br/>
                    Vous pouvez dès à présent créer une nouvelle bière.
                </p>
            </Alert>
        </div>
    );
};

export default Success;