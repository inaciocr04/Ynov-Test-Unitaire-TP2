import { describe, it, expect } from "vitest";
import { StringCalculator } from "../src/StringCalculator";
describe("StringCalculator", () => {
  //   it("add - chaine vide retourne 0", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add("");
  //     // Assert
  //     expect(result).toBe(0);
  //   });
  //   // A vous d'ajouter d'autres tests !

  //   it("add - chaine avec un seul nombre retourne le nombre", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add("5");
  //     // Assert
  //     expect(result).toBe(5);
  //   });
  //   it("add - chaine avec deux nombres retourne la somme des nombres", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add("1,2");
  //     // Assert
  //     expect(result).toBe(3);
  //   });

  //   it("add - chaine avec plusieurs nombres retourne la somme des nombres", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add("1,2,3,4,5");
  //     // Assert
  //     expect(result).toBe(15);
  //   });

  //   it("add - chaine avec des nombres séparés par des espaces retourne la somme des nombres", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add("1, 2, 3");
  //     // Assert
  //     expect(result).toBe(6);
  //   });

  //   it("add - chaine avec un undefined retourne 0", () => {
  //     // Arrange
  //     const calculator = new StringCalculator();
  //     // Act
  //     const result = calculator.add(undefined as unknown as string);
  //     // Assert
  //     expect(result).toBe(0);
  //   });

  it.each([
    ["", 0],
    ["1", 1],
    ["1,2", 3],
    ["1,2,3", 6],
    ["1,2,3,4,5", 15],
  ] as [string, number][])('add("%s") retourne %d', (input, expected) => {
    const calculator = new StringCalculator();
    const result = calculator.add(input);
    expect(result).toBe(expected);
  });

  it("add - chaine avec un seul nombre avec une virgule retourne le nombre", () => {
    // Arrange
    const calculator = new StringCalculator();
    // Act
    const result = calculator.add("7,");
    // Assert
    expect(result).toBe(7);
  });

  it("add - nombre negatif leve une erreur", () => {
    const calculator = new StringCalculator();
    expect(() => calculator.add("1,-2,3")).toThrow(Error);
    expect(() => calculator.add("1,-2,3")).toThrow("-2");
  });

  it("add - chaine avec mon propres delimiteurs personnalisés", () => {
    // Arrange
    const calculator = new StringCalculator();
    // Act
    const result = calculator.add("//;\n1;2");
    // Assert
    expect(result).toBe(3);
  });

  it("add - chaine avec mon propres delimiteurs personnalisés plusieurs nombres", () => {
    // Arrange
    const calculator = new StringCalculator();
    // Act
    const result = calculator.add("//|\n4|5|6");
    // Assert
    expect(result).toBe(15);
  });
});
