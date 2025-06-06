const baseUrl = "http://localhost:3001";

export function getItems() {
  return fetch(`${baseUrl}/items`).then((res) =>
    res.ok ? res.json() : Promise.reject("Error fetching items")
  );
}

export function addItem({ name, link, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, link, weather })
  }).then((res) =>
    res.ok ? res.json() : Promise.reject("Error adding item")
  );
}

export function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE"
  }).then((res) =>
    res.ok ? res.json() : Promise.reject("Error deleting item")
  );
}
