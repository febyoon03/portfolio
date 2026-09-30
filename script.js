const card = document.querySelector(".flip-card");
const button = card.querySelector(".flip-button");
const front = card.querySelector(".card-front");
const back = card.querySelector(".card-back");

function setFlipped(flipped) {
  card.classList.toggle("is-flipped", flipped);
  button.textContent = flipped ? "← Back" : "About me →";
  front.inert = flipped;
  back.inert = !flipped;
}

setFlipped(false);

button.addEventListener("click", () => {
  setFlipped(!card.classList.contains("is-flipped"));
});