import { form, input, videoInner, previewInner } from "./vars.js";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  getRequest(input.value);
  form.reset();
  videoInner.innerHTML = "";
  previewInner.innerHTML = "";
});

const getRequest = (value) => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDHarMwpxQkHIL0cRHQ8C9uKKUvPKVaZRY&q=${value}&type=video`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      renderVideo(data.items[0]);
      renderScreen(data.items);
    });
};
const renderVideo = (item) => {
  videoInner.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${item.id.videoId}" frameborder="0"
				allow="autoplay; encrypted-media" allowfullscreen>`;
};
const renderScreen = (items) => {
  items.forEach((item) => {
    previewInner.insertAdjacentHTML(
      "beforeend",
      `<a href="https://www.youtube.com/embed/${item.id.videoId}"><img src="${item.snippet.thumbnails.medium.url}" alt="video-preview"></a>`
    );
  });
  previewInner.addEventListener("click", (event) => {
    event.preventDefault();
    changeVideo(event.target.parentElement.getAttribute("href"));
  });
};
const changeVideo = (url) => {
  videoInner.innerHTML = `<iframe width="560" height="315" src="${url}" frameborder="0"
				allow="autoplay; encrypted-media" allowfullscreen>`;
};
