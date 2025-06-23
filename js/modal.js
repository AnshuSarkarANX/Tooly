export function showModal(message, onConfirm) {
  const modal = document.getElementById("modal");
  const messageBox = document.getElementById("modal-message");
  const confirmBtn = document.getElementById("modal-confirm");
  const cancelBtn = document.getElementById("modal-cancel");

  messageBox.textContent = message;
  modal.classList.remove("hidden");

  const close = () => {
    modal.classList.add("hidden");
    confirmBtn.onclick = null;
    cancelBtn.onclick = null;
  };

  cancelBtn.onclick = close;
  confirmBtn.onclick = () => {
    close();
    onConfirm();
  };
}
