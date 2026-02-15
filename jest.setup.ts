import "@testing-library/jest-dom";

jest.mock("framer-motion", () => {
  const ForwardRef = ({ children, ...props }: Record<string, unknown>) =>
    typeof children === "function" ? children(props) : children;
  return {
    motion: new Proxy(
      {},
      {
        get: () => ForwardRef,
      }
    ),
    AnimatePresence: ({ children }: { children: unknown }) => children,
    LazyMotion: ({ children }: { children: unknown }) => children,
  };
});
