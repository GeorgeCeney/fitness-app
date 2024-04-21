import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

function SaveRouteWarning() {
    const [show, setShow] = useState(true);
    
    if (show) {
        return (
            <Alert variant="warning" onClose={() => setShow(false)} dismissible>Please enter a route.</Alert>
        );
    }
}

export default SaveRouteWarning;