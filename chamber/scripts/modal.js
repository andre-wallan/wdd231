// JavaScript to handle modal functionality
document.querySelectorAll('.close-modal').forEach(button => {
    button.addEventListener('click', () => {
      button.closest('.modal').style.display = 'none';
    });
  });
  
  document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
    button.addEventListener('click', () => {
      const targetModal = document.querySelector(button.getAttribute('data-bs-target'));
      targetModal.style.display = 'flex';
    });
  });
  
  // Close modal when clicking outside of the modal content
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  });