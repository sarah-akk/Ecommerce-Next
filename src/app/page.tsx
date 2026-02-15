import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProductDashboard } from "@/components/ProductDashboard";

const Index = () => {
  return (
    <ErrorBoundary>
      <ProductDashboard />
    </ErrorBoundary>
  );
};

export default Index;
