import { useEffect, useRef } from "react";
import * as turf from "@turf/turf";

function Map() {
    const mapRef = useRef(null);

    useEffect(() => {
        const googleMap = new window.google.maps.Map(mapRef.current, {
            center: { lat: 40.187511, lng: 29.130242 },
            zoom: 9,
        });
        const bounds = {
            north: 40.318875139888036,
            south: 40.122435157830246,
            east: 29.361199031249985,
            west: 28.69902862109374,
        };

        const rect = new window.google.maps.Rectangle({
            bounds: bounds,
            editable: true,
            draggable: true,
            map: googleMap,
        });

        const newInfoWindow = new window.google.maps.InfoWindow({
            content: "Width: 0<br>Height: 0",
        });

        const calculateArea = (polygon) => {
            const area = turf.area(polygon) / 1000000;;
            return area;
        }

        // listen to changes
        ["bounds_changed", "dragstart", "drag", "dragend"].forEach((eventName) => {
            window.google.maps.event.addListener(rect, eventName, () => {
                const bounds = rect.getBounds();
                newInfoWindow.open(googleMap, rect);
                // console.log({ bounds: bounds?.toJSON(), eventName });
                const rectCenter = rect.getBounds().getCenter();
                newInfoWindow.setPosition(rectCenter);

                const polygon = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [bounds.getNorthEast().lng(), bounds.getNorthEast().lat()],
                                [bounds.getNorthEast().lng(), bounds.getSouthWest().lat()],
                                [bounds.getSouthWest().lng(), bounds.getSouthWest().lat()],
                                [bounds.getSouthWest().lng(), bounds.getNorthEast().lat()],
                                [bounds.getNorthEast().lng(), bounds.getNorthEast().lat()]
                            ]
                        ]
                    },
                    "properties": {}
                };
                const area = calculateArea(polygon);
                const content = `Area:${(area).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} km²`;
                newInfoWindow.setContent(content);
                newInfoWindow.open(googleMap, rect);
            });
        });
    }, []);

    return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
}

export default Map;