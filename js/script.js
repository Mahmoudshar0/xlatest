// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function() {
   // Show the popup after the page loads
   let popup = document.getElementById("newsletter-popup");
   let over = document.getElementById("ov");
   popup.style.display = "flex";

   document.getElementById("close-popup").onclick = function() {
      popup.style.display = "none";
      over.style.display = "none"
   };
});
