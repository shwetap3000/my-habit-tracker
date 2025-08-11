////////////// this will check if i18n is ready or not //////////////////

import React, { useState, useEffect } from "react";
import i18n, { initPromise } from "../i18n";

// HOC that waits for i18n to be fully initialized before rendering children
function withI18nReady(WrappedComponent) {
  return function I18nReadyWrapper(props) {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      // Wait for the initialization promise to resolve
      initPromise
        .then(() => {
          setIsReady(true);
        })
        .catch((error) => {
          console.error("i18n initialization failed:", error);
          // Fallback to render anyway to avoid infinite loading
          setIsReady(true);
        });
    }, []);

    // Show loading while i18n initializes
    if (!isReady) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "18px",
            color: "#666",
            backgroundColor: "#f5f5f5",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "24px", marginBottom: "10px" }}>🌸</div>
            <div>Loading translations...</div>
          </div>
        </div>
      );
    }

    // Render the wrapped component once i18n is ready
    return <WrappedComponent {...props} />;
  };
}

export default withI18nReady;
