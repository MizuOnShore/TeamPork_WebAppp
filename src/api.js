const API_BASE_URL = 'http://localhost:3000/api';

export async function login(username, password) {
  const response = await fetch(`${API_BASE_URL}/Auth/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
      'Accept': 'application/json;odata.metadata=minimal;odata.streaming=true',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;  
}
