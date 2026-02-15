import type { ComponentProps, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { addToast } from "@heroui/react";

/* =======================
   MOCKS
======================= */

// mock HeroUI (ESM-safe)
jest.mock("@heroui/react", () => ({
  Card: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  CardBody: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  CardFooter: ({ children }: { children?: ReactNode }) => <div>{children}</div>,
  Image: (props: Record<string, unknown>) => (
    // eslint-disable-next-line @next/next/no-img-element -- test mock
    <img alt="" {...(props as ComponentProps<"img">)} />
  ),
  Chip: ({ children }: { children?: ReactNode }) => <span>{children}</span>,
  Button: ({
    children,
    onPress,
    isDisabled,
  }: {
    children?: ReactNode;
    onPress?: () => void;
    isDisabled?: boolean;
  }) => (
    <button onClick={onPress} disabled={isDisabled}>
      {children}
    </button>
  ),
  addToast: jest.fn(),
}));

// mock useCart
jest.mock("@/hooks/useCart");

/* =======================
   TEST DATA
======================= */

const mockProduct = {
  id: 1,
  title: "Test Product",
  description: "desc",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 5,
  brand: "Brand",
  category: "electronics",
  thumbnail: "img.jpg",
  images: [],
};

describe("ProductCard", () => {
  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.mocked(useCart).mockReturnValue({
      addToCart: mockAddToCart,
      items: [],
      count: 0,
    } as ReturnType<typeof useCart>);

    mockAddToCart.mockClear();
    (addToast as jest.Mock).mockClear();
  });

  /* =======================
     TESTS
  ======================= */

  it("renders product title", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("renders discounted price", () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText("$90.00")).toBeInTheDocument();
  });

  it("calls addToCart and addToast when clicking Add to Cart", async () => {
    render(<ProductCard product={mockProduct} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith({
      id: 1,
      title: "Test Product",
      thumbnail: "img.jpg",
      price: 100,
    });

    expect(addToast).toHaveBeenCalled();
  });

  it("disables Add to Cart when stock is zero", () => {
    render(<ProductCard product={{ ...mockProduct, stock: 0 }} />);

    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeDisabled();
  });
});
