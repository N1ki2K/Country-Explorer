
export interface Country {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
  currency: string;
  emoji: string;
}

export interface ApiCountry {
  code: string;
  name: string;
  capital: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
  currency: string;
  emoji: string;
}

const COUNTRIES_API_URL = 'https://countries.trevorblades.com/';

const COUNTRIES_QUERY = `
  query GetCountries {
    countries {
      code
      name
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      emoji
    }
  }
`;

export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(COUNTRIES_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: COUNTRIES_QUERY,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    const data = await response.json();
    return data.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};
