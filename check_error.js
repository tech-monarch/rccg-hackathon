const http = require('http');

http.get('http://localhost:3000/providers', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    if (data.includes('nextjs-portal')) {
      console.log("NEXT.JS ERROR PORTAL DETECTED!");
      // Extract error message
      const titleMatch = data.match(/<title>(.*?)<\/title>/);
      console.log("Title:", titleMatch ? titleMatch[1] : "No title");
    } else {
      console.log("No Next.js error portal detected in SSR HTML.");
    }
  });
}).on("error", (err) => {
  console.log("Error fetching: " + err.message);
});
