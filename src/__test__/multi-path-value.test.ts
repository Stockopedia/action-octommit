import {
  MultiPathValueError,
  parseMultiPathValue,
  stringToBoolean,
} from "../multi-path-value";

describe("Multi path value utilities", () => {
  describe(parseMultiPathValue.name, () => {
    it("should handle an empty string", () => {
      expect(parseMultiPathValue("")).toEqual([]);
    });

    it("should handle other falsey values", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(parseMultiPathValue(null as any)).toEqual([]);
    });

    it("should handle a single value", () => {
      expect(parseMultiPathValue("parent:child=new value")).toEqual([
        { path: "parent:child", value: "new value" },
      ]);
    });

    it("should handle multiple value", () => {
      expect(
        parseMultiPathValue(
          "parent1:child1=new value 1;parent2:child2=new value 2;parent3:child3=new value 3;",
        ),
      ).toEqual([
        { path: "parent1:child1", value: "new value 1" },
        { path: "parent2:child2", value: "new value 2" },
        { path: "parent3:child3", value: "new value 3" },
      ]);
    });

    it("should support corercing single values", () => {
      expect(
        parseMultiPathValue("parent1:child1=true", stringToBoolean),
      ).toEqual([{ path: "parent1:child1", value: true }]);
    });

    it("should support corercing multiple values", () => {
      expect(
        parseMultiPathValue(
          "parent1:child1=false;parent2:child2=new value 2;",
          stringToBoolean,
        ),
      ).toEqual([
        { path: "parent1:child1", value: false },
        { path: "parent2:child2", value: true },
      ]);
    });

    it("should ignore empty path values", () => {
      expect(
        parseMultiPathValue(
          "parent1:child1=new value 1;parent2:child2=new value 2; ",
        ),
      ).toEqual([
        { path: "parent1:child1", value: "new value 1" },
        { path: "parent2:child2", value: "new value 2" },
      ]);
    });

    it("should support whitespace around path-values", () => {
      expect(
        parseMultiPathValue(
          "parent1:child1=new value 1 ; parent2:child2=new value 2",
        ),
      ).toEqual([
        { path: "parent1:child1", value: "new value 1" },
        { path: "parent2:child2", value: "new value 2" },
      ]);
    });

    it("should support path-values on subsequent lines", () => {
      expect(
        parseMultiPathValue(
          `parent1:child1=new value 1; 
          parent2:child2=new value 2;`,
        ),
      ).toEqual([
        { path: "parent1:child1", value: "new value 1" },
        { path: "parent2:child2", value: "new value 2" },
      ]);
    });

    it("should support whitespace around the path and value", () => {
      expect(
        parseMultiPathValue(
          "parent1:child1 = new value 1;parent2:child2\t=   new value 2",
        ),
      ).toEqual([
        { path: "parent1:child1", value: "new value 1" },
        { path: "parent2:child2", value: "new value 2" },
      ]);
    });

    it("should throw an error if there is no = in a path-value", () => {
      expect(() => parseMultiPathValue("missing equals")).toThrow(
        new MultiPathValueError(
          'Could not parse value "missing equals" - it should contain an = symbol',
        ),
      );
    });

    it("should throw an error if there is more than one = in a path-value", () => {
      expect(() => parseMultiPathValue("a=b=c")).toThrow(
        new MultiPathValueError(
          'Could not parse value "a=b=c" - it should contain exactly one = symbol (found 2)',
        ),
      );
    });
  });
});
