import { html } from "../external.js";

export const meta = {
  title: "Firma Simple",
};

export const defaultConfig = {
  name: "Ezequiel Schwartzman",
  subTitle: "Software libre",
  image: "https://ezequielschwartzman.org/avatar.jpg",
  imageAlt: "Ezequiel's picture",
  color: "oklch(85% 0.18 85)",
  colorAccent: "oklch(265% 0.18 85)",
  website: "https://ezequielschwartzman.org",
  github: "",
  // linkedin: "",
  // twitter: "",
  // instagram: ""
};

export const schema = {
  name: { name: "Nombre", type: "text" },
  subTitle: { name: "Subtitulo", type: "text" },
  image: { name: "Imagen", type: "image" },
  color: { name: "Color", type: "color" },
  colorAccent: { name: "Color Accent", type: "color" },
  website: { name: "Sitio Web", type: "text" },
  github: { name: "GitHub", type: "text" },
};

export const template = ({
  name,
  subTitle,
  image,
  imageAlt,
  color,
  colorAccent,
  website,
  github,
}) => {
  return html`<div style="width: 200px; background: ${color};">
    <img src=${image} alt=${imageAlt} style=${{ width: "100px", height: "100px" }} />
    <div>${name}</div>
    <div>${subTitle}</div>
  </div>`;
};
