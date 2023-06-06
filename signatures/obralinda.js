import { html } from "../external.js";

export const meta = {
  title: "Obralinda",
};

export const defaultConfig = {
  name: "Cecilia Pallín",
  phone: "+54 9 223 4476972",
  website: "https://www.obralinda.com",
  instagram: "obralinda_",
  image: "https://www.dropbox.com/s/4tvnexrlxz94vnj/obralinda.png?raw=1",
  color: "rgb(221, 110, 58)",
  imageAlt: "Obralinda",
};

export const schema = {
  name: { name: "Nombre", type: "text" },
  phone: { name: "Teléfono", type: "text" },
  website: { name: "Sitio web", type: "text" },
  instagram: { name: "Instagram", type: "text" },
  image: { name: "Imagen", type: "text" },
  imageAlt: { name: "Descripcion Imagen", type: "text" },
  color: { name: "Color", type: "color" },
};

export const template = ({ image, name, phone, website, instagram, color, imageAlt }) => {
  const plainWebsite = website.replace(/https?:\/\//, "");
  const phoneNumbersOnly = phone.replace(/\D/g, "");

  return html`<div
    style="font-family: sans-serif; font-weight: 400; color: black; line-height: 25px; letter-spacing: 0.5px; padding: 12px 6px;"
  >
    <div style="overflow: hidden; ">
      <div style="float: left; padding: 25px 60px 25px 30px; ">
        <img src=${image} style="width: 200px; height: 58.6px;" alt=${imageAlt} />
      </div>
      <div style="float: left; padding-left: 35px;">
        <div>${name}</div>
        <div>
          <a
            href="https://api.whatsapp.com/send?phone=${phoneNumbersOnly}"
            style="text-decoration: none; color: ${color}"
            >${phone}</a
          >
        </div>
        <div style="margin-top: 8px">
          <a href=${website} style="text-decoration: none; color: ${color}">${plainWebsite}</a>
        </div>
        <div>
          <a
            href="https://www.instagram.com/${instagram}/"
            style=${{ textDecoration: "none", color, whiteSpace: "nowrap" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              fill="currentColor"
              height="14px"
              style="display: inline-block; margin-top: -3px; margin-right: 4px;"
            >
              <path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              />
            </svg>
            @${instagram}
          </a>
        </div>
      </div>
    </div>
  </div>`;
};
