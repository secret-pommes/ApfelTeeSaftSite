document.addEventListener("DOMContentLoaded", () => {
  console.log("[Script] DOM Loaded. successfully?");

  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const bodyInput = document.getElementById("body");
  const sendButton = document.getElementById("sendButton");


  sendButton.onclick = () => {
    const user = usernameInput.value;
    const email = emailInput.value;
    const body = bodyInput.value;

    // error check
    if (!user || !email || !body) window.alert("please enter all fileds.");

    fetch("/api/v2/postMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        email,
        body,
      }),
    })
      .then((response) => {
        console.log("[DEBUG] fetch -> response")
        if (response.ok) {
          window.alert("Email Send to API!");
        } else {
          window.alert("Sending Email to API failed.");
        }
      }) // shit ik
      .catch((error) => window.alert(error));
  };
});
