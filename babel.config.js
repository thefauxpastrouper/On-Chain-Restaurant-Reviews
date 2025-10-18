module.exports = {
  plugins: [
    ["babel-plugin-react-compiler", {
      // Enable React Compiler optimizations
      compilationMode: "annotation", // or "infer" for automatic optimization
      // Optional: Add specific optimizations
      target: "18", // Target React 18
    }]
  ],
};
