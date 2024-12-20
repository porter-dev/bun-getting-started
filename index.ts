const server = Bun.serve({
    port: 3000,
    fetch(request) {
      console.write(`${request.method} ${request.url}\n`)
      return Response.json({en: "Welcome to Bun & Porter!", zh: "欢迎来到 Bun & Porter!", ja: "Bun & Porterへようこそ！", th: "ยินดีต้อนรับสู่ Bun & Porter!"});
    },
  });
  
  console.log(`Listening on ${server.url}`);