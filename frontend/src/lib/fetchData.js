export async function fetchData(route) {
  const response = await fetch(route)
  const data = await response.json()
  return data
}
