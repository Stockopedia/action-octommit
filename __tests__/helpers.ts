export const mock = <T>(methods?: Partial<{ [key in keyof T]: unknown }>) => {
  const Mock = jest.fn(() => methods as unknown as T);
  return new Mock();
};
