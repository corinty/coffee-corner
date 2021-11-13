import { Page, Card } from "@shopify/polaris";
import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
}

export default function MenuLanding() {
    const [result, setResult] = useState(null);
    useEffect(() => {
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            /* verbose= */ false
        );
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
    }, []);
    return (
        <Page title="Menu">
            <Card sectioned>
                <h1>Scan Menu Code:</h1> <div id="reader"></div>
                <p>{result}</p>
            </Card>
        </Page>
    );
}
