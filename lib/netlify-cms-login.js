module.exports = (origin, status, content) => {
  if (!origin) {
    return `<!doctype html><body>Origin missing</body></html>`;
  }

  return `<!doctype html><body><script>
    (function() {
      function recieveMessage(e) {
        if (e.origin !== "${origin}") {
          console.log("Wrong origin");
          return;
        }

        console.log("Sending message");
        window.opener.postMessage(
          'authorization:github:${status}:${JSON.stringify(content)}',
          e.origin
        )
      }

      console.log("Initiate handshake");
      window.addEventListener("message", recieveMessage, false)
      window.opener.postMessage("authorizing:github", "${origin}")
    })()
    </script></body></html>`;
}
