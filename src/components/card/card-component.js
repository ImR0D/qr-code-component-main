export default class CardComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    try {
      const responseHtml = await fetch("./components/card/card-component.html");
      const responseCss = await fetch("./components/card/card-component.css");

      const htmlResponseBody = await responseHtml.text();
      const htmlResponseCss = await responseCss.text();

      const attrImageValue = this.getAttribute("image") || "";
      const attrTitleValue = this.getAttribute("title") || "";
      const attrTextValue = this.getAttribute("text") || "";

      this.shadowRoot.innerHTML = `
        <style>
          ${htmlResponseCss}
        </style>
        ${htmlResponseBody}
      `;

      const titleElement = this.shadowRoot.querySelector(".card-title");
      const textElement = this.shadowRoot.querySelector(".card-text");
      const imageElement = this.shadowRoot.querySelector(".card-image");

      if (titleElement) {
        titleElement.textContent = attrTitleValue;
      }

      if (textElement) {
        textElement.textContent = attrTextValue;
      }

      if (imageElement) {
        imageElement.setAttribute("src", attrImageValue);
      }
    } catch (error) {
      console.error("Template ausente ou inexistente, erro: ", error);
    }
  }
}
