import { Outlet, Link } from "react-router-dom";

function App() {
  // Einfache Login/Logout Funktionen
  const login = () => {
    localStorage.setItem("isAuthenticated", "true");
    window.location.reload(); // Einfaches Neuladen für Demo-Zwecke
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    window.location.reload();
  };

  const isAuth = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 bg-white z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/public">Öffentliche Seite</Link> |{" "}
          <Link to="/private">Private Seite</Link> |{" "}
          {isAuth ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <button onClick={login}>Login</button>
          )}
        </div>
      </nav>
      {/* 
          Warum brauchen wir Outlet?
          Outlet ist wie ein Platzhalter, der React Router sagt: 
          "Hier sollen die untergeordneten Routen angezeigt werden" 
      */}
      <Outlet />
    </div>
  );
}

export default App;
