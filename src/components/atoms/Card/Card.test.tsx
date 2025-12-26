import { render, screen } from "@testing-library/react";
import Card from "./Card";

describe("Card component", () => {
  it("renders children correctly", () => {
    render(
      <Card>
        <p>Contenido de prueba</p>
      </Card>
    );

    expect(screen.getByText("Contenido de prueba")).toBeInTheDocument();
  });

  it("applies the card class", () => {
    const { container } = render(
      <Card>
        <span>Test</span>
      </Card>
    );

    const cardElement = container.querySelector(".card");
    expect(cardElement).toBeInTheDocument();
  });
});
