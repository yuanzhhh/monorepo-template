export interface GreetingProps {
  name: string;
}

export const greeting = (props: GreetingProps): string => {
  return `Hello, ${props.name}!`;
};

export const add = (a: number, b: number): number => {
  return a + b;
};
