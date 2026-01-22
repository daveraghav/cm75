const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface GeocodeResult {
  lat: number;
  lng: number;
}

// Simple in-memory cache to avoid redundant API calls during a single session/runtime
const geocodeCache: Record<string, GeocodeResult> = {};

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  if (!address || address === "TBC") return null;
  
  if (geocodeCache[address]) {
    return geocodeCache[address];
  }

  if (!GOOGLE_MAPS_API_KEY) {
    console.warn("Google Maps API Key is missing. Geocoding disabled.");
    return null;
  }

  try {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_MAPS_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.results.length > 0) {
      const location = data.results[0].geometry.location;
      geocodeCache[address] = location;
      return location;
    } else {
      console.error(`Geocoding failed for address: ${address}`, data.status);
      return null;
    }
  } catch (error) {
    console.error(`Error geocoding address ${address}:`, error);
    return null;
  }
}
