export function transformString(str: string): string {
  return str
    .split(' ') // Split the string by spaces
    .map(
      (word, index) =>
        index === 0
          ? word.toLowerCase() // Keep the first word lowercase
          : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // Capitalize the rest
    )
    .join(''); // Join the words back together without spaces
}

const result = transformString('hello world this is typescript');
console.log(result); // Output: "helloWorldThisIsTypescript"
