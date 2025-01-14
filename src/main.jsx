import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import PrivatePage from "./pages/PrivatePage.jsx";
import PublicPage from "./pages/PublicPage.jsx";

// Einfache Auth-Check Funktion
const checkAuth = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

/**
 * 1. Neue Imports:
 *    Statt BrowserRouter importieren wir createBrowserRouter und RouterProvider
 *    createBrowserRouter erstellt unsere Routing-Konfiguration
 *    RouterProvider stellt diese Konfiguration der App zur Verfügung
 *
 * 2. Router-Konfiguration:
 *    Mit createBrowserRouter definieren wir ein Array von Routen-Objekten
 *    Die erste Route ist unsere Root-Route mit dem Pfad "/"
 *    children wird später unsere Unter-Routen enthalten
 *
 * 3. Hauptunterschied zum BrowserRouter:
 *    Die Routing-Konfiguration wird zentral definiert
 *    Wir verwenden ein Objekt-basiertes Setup statt JSX-Routen
 *    Mehr Möglichkeiten für erweiterte Funktionen wie Loader und Error Boundaries
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // Hier kommen unsere Routen hinein
    children: [
      {
        path: "public",
        element: <PublicPage />,
      },
      {
        path: "private",
        element: checkAuth() ? (
          <PrivatePage />
        ) : (
          <Navigate to="/public" replace />
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
