"use client";
import { Component } from "react";
import { Button } from "@heroui/react";
import type { ErrorBoundaryProps, ErrorBoundaryState } from "@/types/types";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            Something went wrong
          </h2>
          <p className="text-muted-foreground max-w-md">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <Button
            color="primary"
            onPress={() => this.setState({ hasError: false, error: undefined })}
          >
            Try Again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
