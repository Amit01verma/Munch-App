import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useEffect } from "react";

function NotFound({ cart }) {
  useEffect(() => {
  document.title = "Page Not Found | Munch";
}, []);
  return (
    <MainLayout cart={cart}>
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8f9fa",
          padding: "20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "#fff",
            padding: "50px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "100px",
              color: "#ff6b35",
              margin: 0,
            }}
          >
            404
          </h1>

          <h2
            style={{
              marginTop: "10px",
              marginBottom: "15px",
            }}
          >
            Oops! Page Not Found
          </h2>

          <p
            style={{
              color: "#666",
              lineHeight: "1.6",
            }}
          >
            The page you're looking for doesn't exist or may have been moved.
          </p>

          <Link to="/" style={{ textDecoration: "none" }}>
            <button
              style={{
                marginTop: "30px",
                padding: "12px 30px",
                background: "#ff6b35",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ← Back to Home
            </button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFound;