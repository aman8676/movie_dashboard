import React, { useState, useEffect } from "react";
import { getPopularPeople, searchPeople } from "../services/api";

function People() {
  const [people, setPeople] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    const loadPopularPeople = async () => {
      try {
        const data = await getPopularPeople();

        setPeople(
          data.filter((person) => person.known_for_department === "Acting")
        );
      } catch (err) {
        console.log(err);
        setError("Failed to load popular people.");
      } finally {
        setLoading(false);
      }
    };

    loadPopularPeople();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
      const data = await searchPeople(searchQuery);
     
      setPeople(
        (data || []).filter(
          (person) => person.known_for_department === "Acting"
        )
      );
    } catch (err) {
      console.log(err);
      setError("Failed to search people.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 text-white relative">
      <h1 className="text-4xl font-bold text-center mb-10">
        🎭 Popular Actors & Actresses
      </h1>

      <form
        onSubmit={handleSearch}
        className="flex justify-center my-6 gap-x-4"
      >
        <input
          type="text"
          placeholder="Search actor or actress..."
          className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 transition-all duration-200 font-semibold"
        >
          Search
        </button>
      </form>

      {error && <p className="text-center text-red-500">{error}</p>}

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center">
          {people.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className="bg-gray-800 rounded-xl shadow-lg p-4 text-center w-52 cursor-pointer transform hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={person.name}
                className="rounded-lg mb-3 w-full h-64 object-cover"
              />
              <h3 className="font-semibold text-lg">{person.name}</h3>
              <p className="text-sm text-gray-400">
                {person.known_for_department}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedPerson && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="bg-gray-900 text-white rounded-2xl shadow-2xl max-w-lg w-full relative p-6 transform scale-100 hover:scale-105 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
              onClick={() => setSelectedPerson(null)}
            >
              ✕
            </button>

            <img
              src={
                selectedPerson.profile_path
                  ? `https://image.tmdb.org/t/p/w400${selectedPerson.profile_path}`
                  : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={selectedPerson.name}
              className="rounded-xl mb-4 w-full h-80 object-cover shadow-lg"
            />
            <h2 className="text-3xl font-bold mb-2 text-center">
              {selectedPerson.name}
            </h2>
            <p className="text-center text-gray-400 mb-4">
              Department: {selectedPerson.known_for_department}
            </p>

            <div className="bg-gray-800 rounded-xl p-4 text-sm space-y-2 shadow-inner">
              <p>
                <span className="font-semibold">Popularity:</span>{" "}
                {selectedPerson.popularity}
              </p>
              {selectedPerson.gender && (
                <p>
                  <span className="font-semibold">Gender:</span>{" "}
                  {selectedPerson.gender === 1 ? "Female" : "Male"}
                </p>
              )}
              {selectedPerson.known_for &&
                selectedPerson.known_for.length > 0 && (
                  <p>
                    <span className="font-semibold">Known For:</span>{" "}
                    {selectedPerson.known_for
                      .map((item) => item.title || item.name)
                      .slice(0, 3)
                      .join(", ")}
                  </p>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default People;
