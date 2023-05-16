import { useEffect, useRef } from "react";
import CountriesBorder from "../coordinates/talha.json"

function Map() {
    const mapRef = useRef(null);
    const dataLayerRef = useRef(null);

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 39, lng: 35 },
            zoom: 6,
        });
        const dataLayer = new window.google.maps.Data();
        dataLayer.addGeoJson(CountriesBorder);
        dataLayer.setMap(googleMap);
        dataLayerRef.current = dataLayer;
    }, []);

    return (
        <>
            <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
        </>
    )
}

export default Map;
