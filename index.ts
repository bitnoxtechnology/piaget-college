import concurrently from "concurrently";

concurrently([
  {
    name: "piaget-server",
    command: "npm run dev",
    cwd: "piaget-server",
    prefixColor: "cyan",
  },
  {
    name: "paiget-college",
    command: "npm run dev",
    cwd: "paiget-college",
    prefixColor: "green",
  },
]);
