import { useState } from "react";
import axios from "axios";

export default function PrivatePage() {
  // State für User-Daten und Formular
  const [userId, setUserId] = useState(""); // Speichert die eingegebene User ID
  const [user, setUser] = useState(null); // Speichert die User-Daten
  const [loading, setLoading] = useState(false); // Ladezustand für API-Aufrufe
  const [error, setError] = useState(null); // Speichert Fehlermeldungen
  const [editMode, setEditMode] = useState(false); // Steuert die Ansicht (Anzeigen/Bearbeiten)
  const [editedUser, setEditedUser] = useState(null); // Speichert die bearbeiteten User-Daten

  // Funktion zum Laden eines Users von der API
  const fetchUser = async (id) => {
    // Setze Ladezustand und lösche alte Fehler
    setLoading(true);
    setError(null);

    try {
      // GET-Anfrage an JSONPlaceholder API
      // Template Literal verwendet die übergebene ID in der URL
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
      );

      // Speichere erhaltene Daten im State
      setUser(response.data);
      // Kopiere Daten für das Bearbeitungsformular
      setEditedUser(response.data);
    } catch (err) {
      // Bei Fehler (z.B. User nicht gefunden, Netzwerkfehler)
      setError("Benutzer nicht gefunden: " + err.message);
      setUser(null);
    }
    // Beende Ladezustand
    setLoading(false);
  };

  // Funktion zum Aktualisieren eines Users
  const updateUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // PUT-Anfrage zum Aktualisieren der Daten
      // editedUser enthält die geänderten Formulardaten
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        editedUser // Die aktualisierten Daten werden im Request-Body gesendet
      );

      // Aktualisiere den User im State mit der Server-Antwort
      setUser(response.data);
      // Beende den Bearbeitungsmodus
      setEditMode(false);
      // Zeige Erfolgsmeldung (bei JSONPlaceholder nur simuliert)
      alert("Benutzer erfolgreich aktualisiert (simuliert)");
    } catch (err) {
      setError("Update fehlgeschlagen: " + err.message);
    }
    setLoading(false);
  };

  // Funktion zum Löschen eines Users
  const deleteUser = async () => {
    setLoading(true);
    setError(null);

    try {
      // DELETE-Anfrage zum Löschen des Users
      await axios.delete(
        `https://jsonplaceholder.typicode.com/users/${userId}`
      );

      // Bei erfolgreicher Löschung: Reset aller relevanten States
      setUser(null);
      setUserId("");
      alert("Benutzer erfolgreich gelöscht (simuliert)");
    } catch (err) {
      setError("Löschen fehlgeschlagen: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Navigation Bar */}
      <nav className="sticky top-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold mr-8">
              Private Seite - User Management
            </h1>
            {/* Suchformular */}
            <div className="flex-1">
              <input
                type="number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)} // Aktualisiert userId bei Eingabe
                placeholder="User ID eingeben (1-10)"
                className="border p-2 mr-2 rounded w-48"
              />
              <button
                onClick={() => fetchUser(userId)} // Startet Suchanfrage
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Suchen
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hauptinhalt */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Lade- und Fehleranzeige */}
        {loading && <div>Laden...</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Benutzeranzeige (nur wenn user vorhanden und nicht im Edit-Modus) */}
        {user && !editMode && (
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="mb-2">
              <strong>Phone:</strong> {user.phone}
            </p>
            <p className="mb-4">
              <strong>Website:</strong> {user.website}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditMode(true)} // Aktiviert den Bearbeitungsmodus
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                Bearbeiten
              </button>
              <button
                onClick={deleteUser} // Startet Löschvorgang
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Löschen
              </button>
            </div>
          </div>
        )}

        {/* Bearbeitungsformular (nur wenn user vorhanden und im Edit-Modus) */}
        {user && editMode && (
          <div className="bg-white border rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">User Bearbeiten</h2>
            <div className="space-y-4">
              {/* Formularfelder mit Two-Way-Binding */}
              <div>
                <label className="block mb-1">Name:</label>
                <input
                  type="text"
                  value={editedUser.name}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  value={editedUser.email}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, email: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Phone:</label>
                <input
                  type="text"
                  value={editedUser.phone}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, phone: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div>
                <label className="block mb-1">Website:</label>
                <input
                  type="text"
                  value={editedUser.website}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, website: e.target.value })
                  }
                  className="border p-2 w-full rounded"
                />
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={updateUser} // Startet Update-Vorgang
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Speichern
                </button>
                <button
                  onClick={() => {
                    setEditMode(false); // Beendet Bearbeitungsmodus
                    setEditedUser(user); // Setzt Änderungen zurück
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
