import { useState, useEffect } from "react";
import axios from "axios";

export default function PublicPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Fehler beim Laden der Daten: " + err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="p-8">Laden...</div>;
  if (error) return <div className="p-8">{error}</div>;

  return (
    // Container mit Padding für die gesamte Seite
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-4">Public Seite</h1>
      <p className="mb-8">
        Dies ist eine public Seite. Alle Benutzer sollten hier Zugang haben.
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-6">
          User von JSONPlaceholder API
        </h2>
        {/* Container für die Posts mit Abstand zwischen den Posts */}
        <div className="space-y-6">
          {users.map((user) => (
            // Einzelner User mit Schlagschatten, Rahmen und Padding
            <div
              key={user.id}
              className="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-3">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-600">{user.phone}</p>
              <p className="text-gray-600">{user.website}</p>
              <h3 className="mt-2">Address:</h3>
              <p className="text-gray-600">{user.address.street}</p>
              <p className="text-gray-600">{user.address.suite}</p>
              <p className="text-gray-600">{user.address.city}</p>
              <p className="text-gray-600">{user.address.zipcode}</p>
              <h3 className="mt-2">Company:</h3>
              <p className="text-gray-600">{user.company.name}</p>
              <p className="text-gray-600">{user.company.catchPhrase}</p>
              <p className="text-gray-600">{user.company.bs}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
