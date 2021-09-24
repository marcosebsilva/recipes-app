async function FetchAPI(url) {
  const response = await fetch(url).then((res) => res.json());
  return response;
}

export default FetchAPI;
