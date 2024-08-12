import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter as Router } from "react-router-dom";
import Auth0PrivaderWithNavigate from "./auth/Auth0PrivaderWithNavigate.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <QueryClientProvider client={queryClient}>
        <Auth0PrivaderWithNavigate>
          <App />
        </Auth0PrivaderWithNavigate>
      </QueryClientProvider>
    </Router>
  </React.StrictMode>
);
