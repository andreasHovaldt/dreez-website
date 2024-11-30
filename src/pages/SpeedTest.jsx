import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/SpeedTest.css";

function SpeedTest() {
    const [latency, setLatency] = useState(null); // Default: null (no test yet)
    const [isFetching, setIsFetching] = useState(false); // Indicates if the test is running

    const testLatency = async () => {
        setIsFetching(true); // Start fetching
        const startTime = Date.now();
        const response = await fetch("http://localhost:8000/ping");
        const data = await response.json(); // Parse JSON response
        const latency = data.ping - startTime; // Calculate latency
        setLatency(latency); // Update latency from backend response
        setIsFetching(false); // Fetching done
    };

    return (
        <>
            <Header />
            <div className="SpeedTest-top-centered">
                <h1>Speed Test</h1>
                <button onClick={testLatency} disabled={isFetching}>
                    {isFetching ? "Testing..." : "Test Latency"}
                </button>
                <br /><br />
                <div>
                    {latency !== null ? (
                        <p>Latency: {latency} ms</p>
                    ) : (
                        <p>Click the button to test latency.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default SpeedTest;






// import React, { useState } from "react";

// const SpeedTest = () => {
//     const [downloadSpeed, setDownloadSpeed] = useState(null);
//     const [uploadSpeed, setUploadSpeed] = useState(null);
//     const [latency, setLatency] = useState(null);

//     const testDownload = async () => {
//         const startTime = Date.now();
//         await fetch("http://localhost:8000/download"); // Replace with your backend URL
//         const duration = (Date.now() - startTime) / 1000;
//         setDownloadSpeed((10 / duration).toFixed(2)); // Assuming 10MB file
//     };

//     const testLatency = async () => {
//         const startTime = Date.now();
//         await fetch("http://localhost:8000/ping");
//         const duration = Date.now() - startTime;
//         setLatency(duration);
//     };

//     return (
//         <div>
//             <h1>Speed Test</h1>
//             <button onClick={testDownload}>Test Download Speed</button>
//             <button onClick={testLatency}>Test Latency</button>
//             <div>
//                 {downloadSpeed && <p>Download Speed: {downloadSpeed} Mbps</p>}
//                 {latency && <p>Latency: {latency} ms</p>}
//             </div>
//         </div>
//     );
// };

// export default SpeedTest;