var modal = document.getElementById("buyModal");

// Get the button that opens the modal
var buyBtn = document.getElementById("buyMe");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeBuy")[0];

// When the user clicks on the button, open the modal
buyBtn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}