import { describe, it, expect } from "vitest";
import { PasswordValidator, ValidatorResult } from "../src/PasswordValidator";

describe("PasswordValidator", () => {
  it.each([["Abcdefg1!"], ["MonMotDePasse9$"], ["P4ssw0rdOk@"]] as [string][])(
    'validate("%s") retourne true',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(true);
    },
  );

  it.each([["Ab1"], ["Aber3fg"], ["Avdk3"], ["Vdksm3"]] as [string][])(
    'validate - trop court: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([
    ["zb1deg4he"],
    ["eldkfpe20fj3"],
    ["dkepdkzo039"],
    ["dekg02n93nf3"],
  ] as [string][])(
    'validate - pas de majuscule: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([
    ["AEBDE039FN39"],
    ["AZETRYEO2932"],
    ["DEKG023J39G3JG3"],
    ["EDNF209N38F"],
  ] as [string][])(
    'validate - pas de minuscule: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([
    ["AbdeplEkfke"],
    ["EdjeojedE"],
    ["DELFoENFiKEf"],
    ["DEJFEkendkefEk"],
  ] as [string][])(
    'validate - pas de chiffre: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([[""], [""]] as [string][])(
    'validate - vide: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([["Abejdi7!"], ["Edj$oje8"], ["GLD@de8k"], ["B#ckqj8j"]] as [
    string,
  ][])('validate - exactement 8 caractères: "%s" retourne true', (password) => {
    const validator = new PasswordValidator();
    const result = validator.validate(password);
    expect(result.isValid).toBe(true);
  });

  it.each([["12345678"], ["87654321"], ["10293847"], ["98765432"]] as [
    string,
  ][])('validate - que des chiffres: "%s" retourne false', (password) => {
    const validator = new PasswordValidator();
    const result = validator.validate(password);
    expect(result.isValid).toBe(false);
  });

  it.each([
    ["ADJE809OEID8"],
    ["DKE209DK9"],
    ["MAPSKFBV728"],
    ["DM29FN39DN"],
  ] as [string][])(
    'validate - que des chiffres et majuscules: "%s" retourne false',
    (password) => {
      const validator = new PasswordValidator();
      const result = validator.validate(password);
      expect(result.isValid).toBe(false);
    },
  );

  it.each([
    ["AbdeplEkfkeed029D3N3D3%"],
    ["EdjeojedEmzkddjefo92837!"],
    ["DELFoENFiKEfMalfjJEf287^"],
    ["DEJFEkendkefEkDELDJ282DB28@"],
  ] as [string][])('validate - très long: "%s" retourne true', (password) => {
    const validator = new PasswordValidator();
    const result = validator.validate(password);
    expect(result.isValid).toBe(true);
  });

  it("validate - trop court et pas de chiffre et pas de caractère spécial retourne les deux erreurs", () => {
    const validator = new PasswordValidator();
    const result = validator.validate("Abcde");

    expect(result.isValid).toBe(false);
    expect(result.errors).toHaveLength(3);
    expect(result.errors.some((e) => e.includes("8 caracteres"))).toBe(true);
    expect(result.errors.some((e) => e.includes("chiffre"))).toBe(true);
    expect(result.errors.some((e) => e.includes("caractère spécial"))).toBe(true);
  });

  it.each([
    ["AbdeplEkf!@#d029D3N3D3"],
    ["Edjeoje%^&*dEmzkddjefo92837"],
    ["DELFoENFiKEf!@#$%^MalfjJEf287"],
    ["DEJFEkendk%^&*efEkDELDJ282DB28"],
  ] as [string][])('validate - avec des caractères spéciaux: "%s" retourne true', (password) => {
    const validator = new PasswordValidator();
    const result = validator.validate(password);
    expect(result.isValid).toBe(true);
  });
});
