export async function fetchData(fetch, route) {
  const response = await fetch(route)
  const data = await response.json()
  return data
}
