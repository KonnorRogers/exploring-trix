import './style.css';
import Trix from 'trix';

window.Trix = Trix; // Don't need to bind to the window, but useful for debugging.
Trix.config.toolbar.getDefaultHTML = toolbarDefaultHTML;

/* There are more robust ways to handle i18n here, but wont be covered. */
const additionalButtons = {
  mention: "Mention",
  reference: "Reference",
  reply: "Reply"
}

Trix.config.lang = { ...Trix.config.lang, ...additionalButtons }

console.log(Trix)

// trix-before-initialize runs too early.
// We only need to do this once. Everything after initialize will get the
// defaultHTML() call automatically.
document.addEventListener('trix-initialize', updateToolbars, { once: true });

function updateToolbars(_event) {
  const toolbars = document.querySelectorAll('trix-toolbar');
  const html = Trix.config.toolbar.getDefaultHTML();
  toolbars.forEach((toolbar) => (toolbar.innerHTML = html));
}

/**
 * This is the default Trix toolbar. Feel free to change / manipulate it how you would like.
 * ATTRIBUTION: All icons taken from GitHub's primer CSS. https://primer.style/octicons/
 */
function toolbarDefaultHTML() {
  const getLang = () => Trix.config.lang

  // Needs to be lazy-evaled for when we add extra keys
  const lang = getLang();
  return `
  <div class="trix-button-row">
    <span class="trix-button-group" data-trix-button-group="text-tools">
      <button type="button" class="trix-button" data-trix-attribute="heading1" title="${lang.heading1}" aria-label="${lang.heading1}" tabindex="0">
        <svg class="trix-button__icon trix-button__icon--heading1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M3.75 2a.75.75 0 01.75.75V7h7V2.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V8.5h-7v4.75a.75.75 0 01-1.5 0V2.75A.75.75 0 013.75 2z"></path></svg>
      </button>

      <button type="button" class="trix-button" data-trix-attribute="bold" data-trix-key="b" title="${lang.bold}" tabindex="-1" aria-label=${lang.bold}>
        <svg class="trix-button__icon trix-button__icon--bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M4 2a1 1 0 00-1 1v10a1 1 0 001 1h5.5a3.5 3.5 0 001.852-6.47A3.5 3.5 0 008.5 2H4zm4.5 5a1.5 1.5 0 100-3H5v3h3.5zM5 9v3h4.5a1.5 1.5 0 000-3H5z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="italic" data-trix-key="i" title="${lang.italic}" tabindex="-1" aria-label=${lang.italic}>
        <svg class="trix-button__icon trix-button__icon--bold" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="quote" title="${lang.quote}" tabindex="-1" aria-label=${lang.quote}>
        <svg class="trix-button__icon trix-button__icon--quote" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M1.75 2.5a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H1.75zm4 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM2.5 7.75a.75.75 0 00-1.5 0v6a.75.75 0 001.5 0v-6z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="code" title="${lang.code}" tabindex="-1" aria-label=${lang.code}>
        <svg class="trix-button__icon trix-button__icon--code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="${lang.link}" tabindex="-1" aria-label=${lang.link}>
        <svg class="trix-button__icon trix-button__icon--link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="bullet" title="${lang.bullets}" tabindex="-1" aria-label=${lang.bullets}>
        <svg class="trix-button__icon trix-button__icon--bullet-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M2 4a1 1 0 100-2 1 1 0 000 2zm3.75-1.5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zm0 5a.75.75 0 000 1.5h8.5a.75.75 0 000-1.5h-8.5zM3 8a1 1 0 11-2 0 1 1 0 012 0zm-1 6a1 1 0 100-2 1 1 0 000 2z"></path></svg>
      </button>
      <button type="button" class="trix-button" data-trix-attribute="number" title="${lang.numbers}" tabindex="-1" aria-label=${lang.numbers}>
        <svg class="trix-button__icon trix-button__icon--number-list" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M2.003 2.5a.5.5 0 00-.723-.447l-1.003.5a.5.5 0 00.446.895l.28-.14V6H.5a.5.5 0 000 1h2.006a.5.5 0 100-1h-.503V2.5zM5 3.25a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 3.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5A.75.75 0 015 8.25zm0 5a.75.75 0 01.75-.75h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 01-.75-.75zM.924 10.32l.003-.004a.851.851 0 01.144-.153A.66.66 0 011.5 10c.195 0 .306.068.374.146a.57.57 0 01.128.376c0 .453-.269.682-.8 1.078l-.035.025C.692 11.98 0 12.495 0 13.5a.5.5 0 00.5.5h2.003a.5.5 0 000-1H1.146c.132-.197.351-.372.654-.597l.047-.035c.47-.35 1.156-.858 1.156-1.845 0-.365-.118-.744-.377-1.038-.268-.303-.658-.484-1.126-.484-.48 0-.84.202-1.068.392a1.858 1.858 0 00-.348.384l-.007.011-.002.004-.001.002-.001.001a.5.5 0 00.851.525zM.5 10.055l-.427-.26.427.26z"></path></svg>
      </button>
    </span>

    <span class="trix-button-group-spacer"></span>

    <span class="trix-button-group trix-button-group--reference-tools" data-trix-button-group="reference-tools">
      <button type="button" class="trix-button" data-trix-attribute="mention" title="${lang.mention}" tabindex="-1" aria-label=${lang.mention}>
        <svg class="trix-button__icon trix-button__icon--mention" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M4.75 2.37a6.5 6.5 0 006.5 11.26.75.75 0 01.75 1.298 8 8 0 113.994-7.273.754.754 0 01.006.095v1.5a2.75 2.75 0 01-5.072 1.475A4 4 0 1112 8v1.25a1.25 1.25 0 002.5 0V7.867a6.5 6.5 0 00-9.75-5.496V2.37zM10.5 8a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0z"></path></svg>
      </button>

      <button type="button" class="trix-button" data-trix-attribute="reference" title="${lang.reference}" tabindex="-1" aria-label=${lang.reference}>
        <svg class="trix-button__icon trix-button__icon--reference" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M16 1.25v4.146a.25.25 0 01-.427.177L14.03 4.03l-3.75 3.75a.75.75 0 11-1.06-1.06l3.75-3.75-1.543-1.543A.25.25 0 0111.604 1h4.146a.25.25 0 01.25.25zM2.75 3.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 01.75.75v2.19l2.72-2.72a.75.75 0 01.53-.22h4.5a.25.25 0 00.25-.25v-2.5a.75.75 0 111.5 0v2.5A1.75 1.75 0 0113.25 13H9.06l-2.573 2.573A1.457 1.457 0 014 14.543V13H2.75A1.75 1.75 0 011 11.25v-7.5C1 2.784 1.784 2 2.75 2h5.5a.75.75 0 010 1.5h-5.5z"></path></svg>
      </button>

      <button type="button" class="trix-button" data-trix-attribute="reply" title="${lang.reply}" tabindex="-1" aria-label=${lang.reply}>
        <svg class="trix-button__icon trix-button__icon--reply" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fill-rule="evenodd" d="M6.78 1.97a.75.75 0 010 1.06L3.81 6h6.44A4.75 4.75 0 0115 10.75v2.5a.75.75 0 01-1.5 0v-2.5a3.25 3.25 0 00-3.25-3.25H3.81l2.97 2.97a.75.75 0 11-1.06 1.06L1.47 7.28a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 0z"></path></svg>
      </button>
    </span>

    <!-- hidden buttons -->
    <button hidden type="button" class="trix-button" data-trix-action="undo" data-trix-key="ctrl+shift+z" title="${lang.undo}" tabindex="-1">${lang.undo}</button>
    <button hidden type="button" class="trix-button" data-trix-action="redo" data-trix-key="ctrl+z" title="${lang.redo}" tabindex="-1">${lang.redo}</button>
  </div>

  <div class="trix-dialogs" data-trix-dialogs>
    <div class="trix-dialog trix-dialog--link" data-trix-dialog="href" data-trix-dialog-attribute="href">
      <div class="trix-dialog__link-fields">
        <input type="url" name="href" class="trix-input trix-input--dialog" placeholder="${lang.urlPlaceholder}" aria-label="${lang.url}" required data-trix-input>
        <div class="trix-button-group">
          <input type="button" class="trix-button trix-button--dialog" value="${lang.link}" data-trix-method="setAttribute">
          <input type="button" class="trix-button trix-button--dialog" value="${lang.unlink}" data-trix-method="removeAttribute">
        </div>
      </div>
    </div>
  </div>
`;
}
