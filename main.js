import './style.css';
import Trix from 'trix';
import 'trix/dist/trix.css';

window.Trix = Trix; // Don't need to bind to the window, but useful for debugging.
Trix.config.toolbar.getDefaultHTML = toolbarDefaultHTML;

// trix-before-initialize runs too early.
// We only need to do this once. Everything after initialize will get the
// defaultHTML() call automatically.
document.addEventListener('trix-initialize', updateToolbars, { once: true });

function updateToolbars(event) {
  const toolbars = document.querySelectorAll('trix-toolbar');
  const html = Trix.config.toolbar.getDefaultHTML();
  toolbars.forEach((toolbar) => (toolbar.innerHTML = html));
}

/**
 * This is the default Trix toolbar. Feel free to change / manipulate it how you would like.
 * @see https://github.com/basecamp/trix/blob/main/src/trix/config/toolbar.coffee
 */
function toolbarDefaultHTML() {
  const lang = Trix.config.lang;
  return `
  <div class="trix-button-row">
    <span class="trix-button-group trix-button-group--text-tools" data-trix-button-group="text-tools">
      <button type="button" class="trix-button trix-button--icon trix-button--icon-bold" data-trix-attribute="bold" data-trix-key="b" title="${lang.bold}" tabindex="-1">${lang.bold}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-italic" data-trix-attribute="italic" data-trix-key="i" title="${lang.italic}" tabindex="-1">${lang.italic}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-strike" data-trix-attribute="strike" title="${lang.strike}" tabindex="-1">${lang.strike}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-link" data-trix-attribute="href" data-trix-action="link" data-trix-key="k" title="${lang.link}" tabindex="-1">${lang.link}</button>
    </span>
    <span class="trix-button-group trix-button-group--block-tools" data-trix-button-group="block-tools">
      <button type="button" class="trix-button trix-button--icon trix-button--icon-heading-1" data-trix-attribute="heading1" title="${lang.heading1}" tabindex="-1">${lang.heading1}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-quote" data-trix-attribute="quote" title="${lang.quote}" tabindex="-1">${lang.quote}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-code" data-trix-attribute="code" title="${lang.code}" tabindex="-1">${lang.code}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-bullet-list" data-trix-attribute="bullet" title="${lang.bullets}" tabindex="-1">${lang.bullets}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-number-list" data-trix-attribute="number" title="${lang.numbers}" tabindex="-1">${lang.numbers}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-decrease-nesting-level" data-trix-action="decreaseNestingLevel" title="${lang.outdent}" tabindex="-1">${lang.outdent}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-increase-nesting-level" data-trix-action="increaseNestingLevel" title="${lang.indent}" tabindex="-1">${lang.indent}</button>
    </span>
    <span class="trix-button-group trix-button-group--file-tools" data-trix-button-group="file-tools">
      <button type="button" class="trix-button trix-button--icon trix-button--icon-attach" data-trix-action="attachFiles" title="${lang.attachFiles}" tabindex="-1">${lang.attachFiles}</button>
    </span>
    <span class="trix-button-group-spacer"></span>
    <span class="trix-button-group trix-button-group--history-tools" data-trix-button-group="history-tools">
      <button type="button" class="trix-button trix-button--icon trix-button--icon-undo" data-trix-action="undo" data-trix-key="z" title="${lang.undo}" tabindex="-1">${lang.undo}</button>
      <button type="button" class="trix-button trix-button--icon trix-button--icon-redo" data-trix-action="redo" data-trix-key="shift+z" title="${lang.redo}" tabindex="-1">${lang.redo}</button>
    </span>
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
