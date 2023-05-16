import React, { useEffect, useState } from "react";
import { getRandomCoordinate } from "../mapsFunctions/streetViewFunction";

function StreetView() {

    const countryName = "turkey";
    const [newCoordinateButton, setNewCoordinateButton] = useState(false);

    useEffect(() => {
        refreshcordinate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newCoordinateButton]);

    const refreshcordinate = () => {
        const data = getRandomCoordinate({ countryName });// rastgele koordinat getirir
        const sv = new window.google.maps.StreetViewService(); // sv sokak görünümü nesnesidir
        sv.getPanorama({ location: data, radius: 50000 }, processSVData); // processSVData geri çağırma fonksiyonudur
    };

    const processSVData = (data, status) => {
        // sokak görünümü varsa
        if (status === 'OK') {
            // Yalnızca Google in yüklemiş olduğu sokak görünümlerini filtreler 
            const regex = /Google/;
            if (regex.test(data.copyright)) {
                // sokak görünümü için tanımlamalar
                new window.google.maps.StreetViewPanorama(
                    document.getElementById('pano'), {
                    position: data.location.latLng, // sokak görünümünün koordinatı
                    pov: {
                        heading: 0, // Kameranın başlangıç pusula yönünü belirtir
                        pitch: 0 // kameranın başlangıç yatay açısını belirtir. örneğin -90 yere , 90 değeri göğe bakmayı sağlar 
                    },
                    disableDefaultUI: true, // arayüzde bulunan butonları görülmez yapar default değeri false dır
                    // showRoadLabels: false, // yol üzerindeki sokak adı yazımını kapatır 
                });
            } else {
                // sokak görünümü yoksa tekrardan çağır
                refreshcordinate();
            }
        } else {
            // eğer gelen koordinattaki sokak görünümü google in değilse yeniden çiz
            refreshcordinate();
        }
    };
    return (
        <>
            <div
                id="pano"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    filter: 'invert(1)',
                }}
            >
            </div>
            <div>
                <button
                    style={{
                        position: 'relative'
                    }}
                    onClick={() => setNewCoordinateButton(!newCoordinateButton)}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    New Coordinate
                </button>
            </div>
        </>
    )
}

export default StreetView;