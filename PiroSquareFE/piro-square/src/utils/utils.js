export const fetchGET = async url => {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (res.ok) {
    const result = await res.json();
    return result;
  }
};

export const fetchPOST = async (url, body) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (res.ok) {
    const result = await res.json();
    return result;
  }
};
