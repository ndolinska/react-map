export const getAddressFromAPI = async (lat, lng) => {
  try {
    const url = `/react-map/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Problem z połączeniem do nominatim');
    }
    const data = await response.json();
    return data.display_name; 
} catch (error) {
    console.error("Błąd API:", error);
    return "Nie udało się pobrać adresu.";
  }
};