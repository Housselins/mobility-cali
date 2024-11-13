import React from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
const API_KEY =
  globalThis.GOOGLE_MAPS_API_KEY ?? "AIzaSyDuSaUQbK7g1wfnfrKG1nGo-TJBSp0WESc";

export default function MapInfoCali() {
  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={API_KEY}
    >
      <Map
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />
    </APIProvider>
  );
}
