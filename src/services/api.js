const API_KEY = "2def7ff8b46749de9af6f99fe2605da4";
const BASE_URL ="https://api.themoviedb.org/3"

export const getPopularMovies = async ()=>{
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)

    const data = await response.json();

    return data.results;
}

export const searchMovies = async(query)=>{
const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`)
    const data= await response.json();
    return data.results;
}


export const getPopularPeople = async () => {
  const response = await fetch(`${BASE_URL}/person/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchPeople = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data.results;
};