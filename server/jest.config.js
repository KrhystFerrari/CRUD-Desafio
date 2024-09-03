module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "node"],
  moduleDirectories: ["node_modules", "server"],
  testPathIgnorePatterns: ["/node_modules/", "/build/"],
};
