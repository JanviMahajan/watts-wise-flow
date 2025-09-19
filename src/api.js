const API_URL = "https://greenops-backend-nhgv.onrender.com";

// Authentication
export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return await res.json();
}

export async function register(email, password, name, userType) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, name, user_type: userType }),
  });
  return await res.json();
}

// Data Management
export async function uploadCSV(file, token, branchName = null) {
  const formData = new FormData();
  formData.append("file", file);
  if (branchName) formData.append("branch_name", branchName);

  const res = await fetch(`${API_URL}/upload-csv/`, {
    method: "POST",
    headers: { "Authorization": `Bearer ${token}` },
    body: formData,
  });
  
  return await res.json();
}

export async function addManualEntry(data, token) {
  const res = await fetch(`${API_URL}/manual-entry`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  return await res.json();
}

// Data Fetching
export async function getEnergyData(token, branchId = null) {
  const url = branchId 
    ? `${API_URL}/energy-data?branch_id=${branchId}`
    : `${API_URL}/energy-data`;
    
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return await res.json();
}

export async function getPredictions(token, branchId = null) {
  const url = branchId 
    ? `${API_URL}/predictions?branch_id=${branchId}`
    : `${API_URL}/predictions`;
    
  const res = await fetch(url, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return await res.json();
}

export async function getOptimizationTips(token, userType) {
  const res = await fetch(`${API_URL}/optimization-tips?user_type=${userType}`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return await res.json();
}

export async function getBranches(token) {
  const res = await fetch(`${API_URL}/branches`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return await res.json();
}

export async function updateUserSettings(token, settings) {
  const res = await fetch(`${API_URL}/user-settings`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(settings),
  });
  return await res.json();
}
