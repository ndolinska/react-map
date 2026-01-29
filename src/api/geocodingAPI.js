export const getAddressFromAPI = async (lat, lng) => {
  try {
    const isProduction = import.meta.env.PROD;

    const baseUrl = isProduction 
      ? 'https://nominatim.openstreetmap.org' 
      : '/api-map';

    const url = `${baseUrl}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=pl`;

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