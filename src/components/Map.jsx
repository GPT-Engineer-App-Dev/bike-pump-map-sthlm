import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

// Custom icon for bike pump stations
const bikePumpIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const Map = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bike pump stations data
    fetch('https://api.example.com/stockholm-bike-pump-stations')
      .then(response => response.json())
      .then(data => {
        setStations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bike pump stations:', error);
        setLoading(false);
      });
  }, []);

  return (
    <Box height="100vh" width="100%">
      {loading ? (
        <Spinner size="xl" />
      ) : (
        <MapContainer center={[59.3293, 18.0686]} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.map(station => (
            <Marker key={station.id} position={[station.latitude, station.longitude]} icon={bikePumpIcon}>
              <Popup>
                <strong>{station.name}</strong><br />
                {station.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </Box>
  );
};

export default Map;