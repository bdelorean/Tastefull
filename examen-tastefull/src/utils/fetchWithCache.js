
// Functie om data te halen met cache-ondersteuning
export const fetchWithCache = async (key, fetchFn, expiration = 3600000) => {
  // Probeer de cache-gegevens uit localStorage op te halen
    const cachedData = localStorage.getItem(key);
     // Probeer de tijd van het opslaan van de gegevens te krijgen
    const cachedTime = localStorage.getItem(`${key}_timestamp`);
    
    // Als de cache geldig is, geef de gegevens terug
    if (cachedData && cachedTime && Date.now() - cachedTime < expiration) {
      return JSON.parse(cachedData);
    }
    
     // Als de cache niet geldig is voer de fetch functie uit
    const data = await fetchFn();

    // Sla de nieuwe verkregen data op in localStorage in JSON-formaat
     // Converteer de data naar een string en sla het op
    localStorage.setItem(key, JSON.stringify(data));

    // Sla de tijd op waarop de data is opgeslagen
    localStorage.setItem(`${key}_timestamp`, Date.now());
    return data;
  };
  