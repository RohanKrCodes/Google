document.addEventListener("DOMContentLoaded", function () {
  // Retrieve shortcuts from localStorage
  const shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [];

  // Display existing shortcuts
  const shortcutList = document.getElementById("shortcutList");
  shortcuts.forEach(function (shortcut) {
    addShortcutElement(shortcut);
  });

  // Add shortcut button click event
  const addShortcutBtn = document.getElementById("addShortcutBtn");
  addShortcutBtn.addEventListener("click", function () {
    showModal();
  });

  // Save shortcut button click event
  const saveShortcutBtn = document.getElementById("saveShortcutBtn");
  saveShortcutBtn.addEventListener("click", function () {
    const name = document.getElementById("shortcutNameInput").value;
    const url = document.getElementById("shortcutUrlInput").value;
    const icon = document.getElementById("shortcutIconInput").value;

    if (name && url) {
      const shortcut = { name: name, url: url, icon: icon };
      shortcuts.push(shortcut);
      localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
      addShortcutElement(shortcut);
      closeModal();
    } else {
      alert("Please enter name and URL for the shortcut.");
    }
  });

  // Close modal button click event
  const closeBtn = document.querySelector(".close");
  closeBtn.addEventListener("click", function () {
    closeModal();
  });

  // Function to add a new shortcut element to the list
  function addShortcutElement(shortcut) {
    const li = document.createElement("li");
    li.innerHTML = `
        <a href="${shortcut.url}" target="_blank">
        ${
          shortcut.icon
            ? `<img src="${shortcut.icon}" class="shortcut-icon">`
            : ""
        }
          <div class="shortcut-label">${shortcut.name}</div>
          
        </a>
        <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
      `;
    shortcutList.appendChild(li);

    // Add event listener for delete button
    const deleteBtn = li.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", function () {
      const index = shortcuts.indexOf(shortcut);
      if (index > -1) {
        shortcuts.splice(index, 1);
        localStorage.setItem("shortcuts", JSON.stringify(shortcuts));
        li.remove();
      }
    });
  }

  // Function to show modal
  function showModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  }

  // Function to close modal
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
  }

  const voiceSearchBtn = document.getElementById("voiceSearchBtn");
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 5;

  voiceSearchBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    recognition.start();
  });

  recognition.addEventListener("result", function (event) {
    const transcript = event.results[0][0].transcript;
    document.getElementById("searchInput").value = transcript;
    document.getElementById("searchForm").submit();
  });

  recognition.addEventListener("error", function (event) {
    console.error("Speech recognition error detected: " + event.error);
  });
});
