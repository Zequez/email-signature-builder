import { html, tw, render, useState, useEffect, useRef } from "./external.js";
import { usePersistentState } from "./hooks.js";
import obralinda, { schema as obralindaSchema, defaultConfig } from "./signatures/obralinda.js";

function App(props) {
  const signatureElement = useRef();
  const codeElement = useRef();
  const [hasCopyPermission, setHasCopyPermission] = useState(true);
  const [config, setConfig] = usePersistentState("obralindaConfig", defaultConfig);
  const [smallView, setSmallView] = useState(false);
  const [rawHtml, setRawHtml] = useState("");

  useEffect(() => {
    promptCopyPermission();
  }, []);

  function promptCopyPermission() {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
      if (result.state == "granted" || result.state == "prompt") {
        setHasCopyPermission(true);
      } else {
        setHasCopyPermission(false);
      }
    });
  }

  const handleConfigInput = (key) => (value) => {
    setConfig((oldConfig) => {
      return { ...oldConfig, [key]: value };
    });
  };

  useEffect(() => {
    setRawHtml(signatureElement.current.innerHTML);
  }, [config]);

  const copyEnabled = hasCopyPermission;

  return html`
    <div tw="font-thin bg-gray-700 min-h-screen text-white py-4">
      <h1 tw="text-3xl text-center mb-4">Firmas de email</h1>
      <div tw="lg:flex lg:space-x-4 px-4 max-w-screen-lg mx-auto shadow-md">
        <div tw="flex-shrink-0 p-4 bg-gray-100 rounded-md max-w-[550px]">
          <div tw="mb-4 text-center">${MobileSwitchButton(smallView, setSmallView)}</div>
          <div
            ref=${signatureElement}
            tw="border border-gray-300 mx-auto mb-4 bg-white"
            style=${smallView ? "width: 320px" : "width: 100%"}
          >
            ${obralinda(config)}
          </div>
          ${CopyOrSelectButton("HTML", copyEnabled, () =>
            selectAndCopy(signatureElement.current, copyEnabled)
          )}
          <code
            ref=${codeElement}
            tw="block max-w-full h-[300px] mt-4 mb-4 overflow-y-scroll whitespace-pre-wrap bg-gray-600 text-white p-2 rounded-md"
            >${rawHtml}
          </code>
          ${CopyOrSelectButton("texto", copyEnabled, () =>
            selectAndCopy(codeElement.current, copyEnabled)
          )}
        </div>
        <div
          tw="bg-gray-100 font-normal flex-grow mt-4 lg:mt-0 py-4 space-y-4 rounded-md shadow-md"
        >
          ${Object.entries(obralindaSchema).map(([key, { name, type }]) => {
            if (type === "text") return TextInput(name, config[key], handleConfigInput(key));
            else if (type === "color") return ColorInput(name, config[key], handleConfigInput(key));
          })}
        </div>
      </div>
    </div>
  `;
}

const CopyOrSelectButton = (label, copyEnabled, callback) =>
  copyEnabled
    ? CopyButton(`Copiar como ${label}`, callback)
    : Selectbutton(`Seleccionar como ${label}`, callback);

const CopyButton = (label, callback) => {
  return html`<div tw="text-center text-black">
    <button
      onClick=${callback}
      tw="px-3 py-2 rounded-md bg-blue-400 text-white hover:scale-105 active:scale-100 transition-transform"
    >
      ${label}
    </button>
  </div>`;
};

const Selectbutton = (label, callback) => html`<div tw="text-center text-black">
  <button
    onClick=${callback}
    tw="px-3 py-2 rounded-md bg-blue-400 text-white hover:scale-105 active:scale-100 transition-transform"
  >
    ${label}
  </button>
  <div tw="mt-2">Una vez seleccionado, copia con Ctrl/Cmd+C</div>
</div>`;

const MobileSwitchButton = (value, onClick) => html`<button onClick=${() => onClick(!value)}>
  <span tw=${["inline-block px-3 py-2 rounded-l-md bg-blue-400", { "bg-gray-400": !value }]}
    >Móvil</span
  >
  <span tw=${["inline-block px-3 py-2 rounded-r-md bg-blue-400", { "bg-gray-400": value }]}
    >Max</span
  >
</button>`;

const InputContainer = (name, inputEl) => html` <div tw="text(xl black opacity-75)">
  <div tw="sm:inline-block sm:w-1/3 sm:text-right whitespace-nowrap pl-4">${name}</div>
  <div tw="sm:inline-block sm:w-2/3 sm:text-left whitespace-nowrap pl-2 pr-4">${inputEl}</div>
</div>`;

const TextInput = (name, value, onInput) =>
  InputContainer(
    name,
    html`<input
      type="text"
      tw="rounded-md shadow-sm px-4 py-2 border border-gray-300 w-full"
      value=${value}
      onInput=${(e) => onInput(e.target.value)}
    />`
  );

const ColorInput = (name, value, onInput) =>
  InputContainer(
    name,
    html`<label
      style=${{ background: value }}
      tw="relative inline-block bg-white p-1 rounded-md shadow-md w-28 ml-2 h-8 align-middle"
    >
      <input
        tw="absolute inset-0 opacity-0"
        type="color"
        value=${value}
        onInput=${(e) => onInput(e.target.value)}
      />
    </label>`
  );

const RangeInput = ({ name, min, max, value, onInput, isRatio }) => {
  if (isRatio) {
    min = 0;
    max = 1;
  }
  return InputContainer(
    name,
    html`
      <input
        type="range"
        min=${min}
        max=${max}
        value=${value}
        step=${isRatio ? 0.01 : 1}
        tw="cursor-ew-resize mx-2"
        onInput=${(e) => onInput(isRatio ? parseFloat(e.target.value) : parseInt(e.target.value))}
      />
      <span class=${tw`font-mono opacity-70`}
        >${isRatio ? parseFloat(value).toFixed(2) : value}</span
      >
    `
  );
};

function selectAndCopy(element, copyEnabled = true) {
  window.getSelection().removeAllRanges();

  var range = document.createRange();
  range.selectNode(element);
  window.getSelection().addRange(range);

  if (copyEnabled) {
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  }
}

render(html`<${App} />`, document.getElementById("app"));
