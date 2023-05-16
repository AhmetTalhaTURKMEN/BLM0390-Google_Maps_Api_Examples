import React, { useRef, useEffect, useState } from "react";

function Map() {
    const mapRef = useRef(null);
    const polyRef = useRef(null);
    const markersRef = useRef([]);
    const [polylineColor, setPolylineColor] = useState("#000000");

    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            zoom: 7,
            center: { lat: 40.187511, lng: 29.130242 },
        });
        const poly = new window.google.maps.Polyline({
            strokeColor: polylineColor,
            strokeOpacity: 0.7,
            strokeWeight: 5,
        });
        poly.setMap(map);
        polyRef.current = poly;
        map.addListener("click", addLatLng);
        return () => {
            window.google.maps.event.clearListeners(map, "click");
            poly.setMap(null);
            markersRef.current.forEach((marker) => marker.setMap(null));
            markersRef.current = [];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        polyRef.current.setOptions({ strokeColor: polylineColor });
    }, [polylineColor]);

    function addLatLng(event) {
        const path = polyRef.current.getPath();
        path.push(event.latLng);
        console.log(event.latLng.lat(), event.latLng.lng());

        const marker = new window.google.maps.Marker({
            position: event.latLng,
            title: "#" + path.getLength(),
            map: polyRef.current.getMap(),
        });
        markersRef.current.push(marker);
    }

    function clearPolyline() {
        const path = polyRef.current.getPath();
        path.clear();
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];
    }

    function randomColor() {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        const hexColor = "#" + "0".repeat(6 - color.length) + color;
        setPolylineColor(hexColor);
        console.log(hexColor)
    }

    return (
        <div>
            <div style={{ display: 'flex', position: 'absolute' }}>
                <button
                    style={{ zIndex: 1 }}
                    onClick={clearPolyline}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Clear
                </button>
                <button
                    style={{ zIndex: 1 }}
                    onClick={randomColor}
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                >
                    Random Color
                </button>
            </div>

            <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
        </div>
    );
}

export default Map;