import { useEffect, useRef } from "react";

function Map({ mapType }) {
    const mapRef = useRef(null);

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 41.890171, lng: 12.492240 },
            zoom: 14,
            mapTypeId: mapType,
            disableDefaultUI: mapType !== "satellite" && mapType !== "hybrid",
        });
    }, [mapType]);

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <div
                style={{
                    position: "absolute",
                    top: "10px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: "1",
                    backgroundColor: "white",
                    padding: "5px",
                    userSelect: "none",
                }}
            >
                {mapType.toUpperCase()}
            </div>
            <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
        </div>
    );
}


function App() {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gridTemplateRows: "repeat(2, 1fr)",
                gap: 10,
                height: "100vh",
            }}
        >
            <div>
                <Map mapType="roadmap" />
            </div>
            <div>
                <Map mapType="terrain" />
            </div>
            <div>
                <Map mapType="satellite" />
            </div>
            <div>
                <Map mapType="hybrid" />
            </div>
        </div>
    );
}

export default App;
