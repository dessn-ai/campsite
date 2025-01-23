import React from "react";

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errors: Set<string>; errorInfo: React.ErrorInfo | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errors: new Set(), errorInfo: null };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      errors: new Set([error.toString() + (error.stack || "")]),
    };
  }

  componentDidMount() {
    const handleRouteChange = (event: MessageEvent) => {
      if (event.data.type === "ROUTER_UPDATE") {
        this.setState({ hasError: false, errors: new Set(), errorInfo: null });
      }
    };

    window.addEventListener("message", handleRouteChange);
    return () => window.removeEventListener("message", handleRouteChange);
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("[DESSN ERROR BOUNDARY]:", error);
    console.error(
      "[DESSN ERROR BOUNDARY] Component Stack:",
      errorInfo.componentStack
    );

    // Update state with new error, using Set to automatically dedup based on full error string
    this.setState((prevState) => {
      const newErrors = new Set(prevState.errors);
      newErrors.add(error.toString() + (error.stack || ""));
      return {
        errors: newErrors,
        errorInfo,
      };
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div
            style={{
              padding: "20px",
              margin: "20px",
              border: "2px solid #ff0000",
              borderRadius: "4px",
              backgroundColor: "#fff5f5",
            }}
          >
            <h2 style={{ color: "#ff0000", marginTop: 0 }}>
              Something went wrong!
            </h2>
            {Array.from(this.state.errors).map((errorStr, index) => {
              // Split the stored error string back into message and stack
              const [message, ...stackParts] = errorStr.split("\n");
              const stack = stackParts.join("\n");
              return (
                <div key={index} style={{ marginBottom: "20px" }}>
                  <h3 style={{ color: "#cc0000", marginTop: "10px" }}>
                    Error {index + 1}:
                  </h3>
                  <pre
                    style={{
                      whiteSpace: "pre-wrap",
                      backgroundColor: "#fff",
                      padding: "10px",
                      border: "1px solid #ffcccc",
                      borderRadius: "4px",
                    }}
                  >
                    {message}
                    {stack && (
                      <>
                        {"\n\nStack Trace:\n"}
                        {stack}
                      </>
                    )}
                  </pre>
                </div>
              );
            })}
            {this.state.errorInfo && (
              <div>
                <h3 style={{ color: "#cc0000" }}>Component Stack:</h3>
                <pre
                  style={{
                    whiteSpace: "pre-wrap",
                    backgroundColor: "#fff",
                    padding: "10px",
                    border: "1px solid #ffcccc",
                    borderRadius: "4px",
                  }}
                >
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </div>
          <div id="error-for-ai" style={{ display: "none" }}>
            {Array.from(this.state.errors).map((errorStr, index) => {
              const [message, ...stackParts] = errorStr.split("\n");
              const stack = stackParts.join("\n");
              return `
# Error ${index + 1}

## Error Message
${message}

## Stack Trace
\`\`\`
${stack}
\`\`\`

${
  this.state.errorInfo
    ? `## Component Stack
\`\`\`
${this.state.errorInfo.componentStack}
\`\`\`
`
    : ""
}
              `;
            })}
          </div>
        </>
      );
    }

    return this.props.children;
  }
}
