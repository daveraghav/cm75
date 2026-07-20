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

const CODA_API_TOKEN_IG = process.env.CODA_API_TOKEN_IG;
const CODA_DOC_ID_IG = "tnBYpicfeT"; // Invited Guests Doc ID

export async function fetchCodaIG(endpoint: string, options: RequestInit = {}) {
  const url = `https://coda.io/apis/v1${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${CODA_API_TOKEN_IG}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch from Coda IG");
  }

  return response.json();
}

export async function getRsvpOptions() {
  const tableId = "grid-1Hb81QWxKa";
  const titleColumnId = "c-UVzbroWefM";
  const eventsColumnId = "c-RrvT4gMpV4";

  const [titleCol, eventsCol] = await Promise.all([
    fetchCodaIG(`/docs/${CODA_DOC_ID_IG}/tables/${tableId}/columns/${titleColumnId}`),
    fetchCodaIG(`/docs/${CODA_DOC_ID_IG}/tables/${tableId}/columns/${eventsColumnId}`)
  ]);

  const titles = (titleCol.format?.options || []).map((opt: any) => opt.name);
  const events = (eventsCol.format?.options || []).map((opt: any) => opt.name);

  return { titles, events };
}

export async function submitRsvp(data: any) {
  const tableId = "grid-1Hb81QWxKa";
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

  return fetchCodaIG(`/docs/${CODA_DOC_ID_IG}/tables/${tableId}/rows`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

