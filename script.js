document.addEventListener("DOMContentLoaded", () => {
  let stn = document.getElementById("shorten");
  stn.addEventListener('click', shortenUrl);

  async function shortenUrl() {
    let longURL = document.getElementById("originalurl").value;
    let shortURL = document.getElementById("shortenedurl");

    const result = await fetch(`https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(longURL)}`);
    const data = await result.json();

    if (data.ok) {
      shortURL.value = data.result.short_link2;
    } else {
      alert("Error: Invalid URL or API issue.");
    }
  }
  let newURL = document.getElementById("shortenedurl");
  let copyButton = document.getElementById("copy");

  copyButton.onclick = () => {
    newURL.select();

    // Use the Clipboard API to copy the URL to the clipboard
    navigator.clipboard.writeText(newURL.value)
      .then(() =>
      {
      let message = document.getElementById("copy-message");
      message.textContent = "Copied to clipboard!";
      setTimeout(() =>
       {
        message.textContent = "";
      }, 2000);
      })
      .catch((error) => {
        alert("Failed to copy to clipboard: " + error);
      });
  };
});
