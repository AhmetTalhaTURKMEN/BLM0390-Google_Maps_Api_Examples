import { useEffect, useRef } from "react";
import CountriesBorder from "../coordinates/countriesBorder.json"

function Map() {
    const mapRef = useRef(null);
    const dataLayerRef = useRef(null);

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 40.187511, lng: 29.130242 },
            zoom: 4,
        });
        const dataLayer = new window.google.maps.Data();
        dataLayer.addGeoJson(CountriesBorder);
        dataLayer.setMap(googleMap);

        const newInfoWindow = new window.google.maps.InfoWindow({
            content: "Countrie: ",
        });

        const handleMouseOver = (event) => {
            dataLayer.overrideStyle(event.feature, {
                fillColor: randomColor(),
                strokeWeight: 2,
                strokeColor: '#fff'
            });

            const countryName = event.feature.getProperty('ADMIN');

            console.log(countryName);
            newInfoWindow.setPosition(event.latLng);
            newInfoWindow.setContent("Countrie: "+countryName);
            newInfoWindow.open(googleMap);
        };

        dataLayer.addListener('mouseover', handleMouseOver);

        dataLayerRef.current = dataLayer;
    }, []);

    const clearMap = () => {
        dataLayerRef.current.revertStyle();
    }

    function randomColor() {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        const hexColor = "#" + "0".repeat(6 - color.length) + color;
        console.log(hexColor);
        return hexColor;
    }

    return (
        <>
            <div style={{ display: 'flex', position: 'absolute' }}>
                <button
                    style={{ zIndex: 1 }}
                    onClick={clearMap}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Clear Map
                </button>
            </div>
            <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
        </>
    )
}

export default Map;
