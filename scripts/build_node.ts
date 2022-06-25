import { build, emptyDir } from "https://deno.land/x/dnt/mod.ts";

await emptyDir("./npm");

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    deno: true,
    timers: true,
    blob: true,
    undici: true,
    custom: [
      {
        package: {
          name: 'ws',
          version: "^8.4.0",
        },
        globalNames: [
          {
            name: "WebSocket",
            exportName: "default"
          }
        ]
      }
    ]
  },
  package: {
    name: "denocord",
    version: Deno.args[0],
    description: "An Object Oriented Discord Api Wrapper",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/denocord-labs/denocordts.git",
    },
    bugs: {
      url: "https://github.com/denocord-labs/denocordts/issues",
    },
  },
  typeCheck: false,
  test: false,
  declaration: true,
  scriptModule: false,
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
