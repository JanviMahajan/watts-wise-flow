const API_URL = "https://greenops-backend-nhgv.onrender.com";

export async function uploadCSV(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${API_URL}/upload-csv/`, {
    method: "POST",
    body: formData,
  });
  
  return await res.json();
}
