import { useEffect, useState } from "react";
import L from "leaflet";

const MapComponent = () => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";

    script.onload = () => {
      setLeafletLoaded(true);
    };

    document.body.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    if (leafletLoaded && typeof L !== "undefined") {
      const mymap = L.map("map").locate(
        {
          setView: true,
          maxZoom: 14,
        },
        12
      );

      function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng)
          .addTo(mymap)
          .bindPopup("📌 You are here")
          .openPopup();
      }
      mymap.on("locationfound", onLocationFound);

      var polygonCoordinates = [
        [37.97287363663796, 23.647779804534593],
        [37.963734124075415, 23.633220903412393],
        [37.94949122089224, 23.640230744693667],
        [37.944601229299366, 23.665574017015643],
        [37.96904793261736, 23.674740732536634],
        [37.97287363663796, 23.647779804534593],
      ];

      var polygon = L.polygon(polygonCoordinates, {
        color: "blue",
        fillColor: "#86b7ef",
        fillOpacity: 0.5,
      }).addTo(mymap);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution:
            'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
        }
      ).addTo(mymap);

      navigator.geolocation.getCurrentPosition(
        function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;

          var userLocation = L.latLng(lat, lng);
          var polygonCenter = L.latLng(
            polygon.getBounds().getCenter().lat,
            polygon.getBounds().getCenter().lng
          );

          const insideSection = document.getElementById("insideSection");
          const outsideSection = document.getElementById("outsideSection");

          if (insideSection && outsideSection) {
            insideSection.style.display = "block";
            outsideSection.style.display = "none";
          } else {
            console.log(
              "Elementos insideSection e outsideSection não encontrados."
            );
          }

          if (polygon.getBounds().contains(userLocation)) {
            console.log("User is inside the polygon");
          } else {
            console.log("User is outside the polygon");
          }
        },
        function (error) {
          console.log("Error getting user location:", error);
          const insideSection = document.getElementById("insideSection");
          const outsideSection = document.getElementById("outsideSection");

          if (insideSection && outsideSection) {
            insideSection.style.display = "none";
            outsideSection.style.display = "block";
          } else {
            console.log(
              "Elementos insideSection e outsideSection não encontrados."
            );
          }
        }
      );
    }
  }, [leafletLoaded]);

  return <div id="map" style={{ height: "180px" }} />;
};

export default MapComponent;
