const CODA_API_TOKEN = process.env.CODA_API_TOKEN;
const CODA_DOC_ID = process.env.CODA_DOC_ID;

export async function fetchCoda(endpoint: string, options: RequestInit = {}) {
  const url = `https://coda.io/apis/v1${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${CODA_API_TOKEN}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch from Coda");
  }

  return response.json();
}

export async function getEvents(tableId: string) {
  return fetchCoda(`/docs/${CODA_DOC_ID}/tables/${tableId}/rows`);
}

export async function registerForEvent(tableId: string, data: any) {
  const body = {
    rows: [
      {
        cells: Object.entries(data).map(([column, value]) => ({
          column,
          value,
        })),
      },
    ],
  };

  return fetchCoda(`/docs/${CODA_DOC_ID}/tables/${tableId}/rows`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}
