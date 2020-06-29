import {Constants} from "../constants";
import {disableToolbar, enableToolbar, removeCurrentToolbar, setCurrentToolbar} from "../toolbar/setToolbar";
import {hasClosestByAttribute, hasClosestByMatchTag} from "../util/hasClosest";
import {hasClosestByHeadings} from "../util/hasClosestByHeadings";
import {getEditorRange, selectIsEditor} from "../util/selection";

export const highlightToolbar = (vditor: IVditor) => {
    clearTimeout(vditor.sv.hlToolbarTimeoutId);
    vditor.sv.hlToolbarTimeoutId = window.setTimeout(() => {
        if (vditor.sv.element.getAttribute("contenteditable") === "false") {
            return;
        }
        if (!selectIsEditor(vditor.sv.element)) {
            return;
        }

        removeCurrentToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);
        enableToolbar(vditor.toolbar.elements, Constants.EDIT_TOOLBARS);

        const range = getEditorRange(vditor.sv.element);
        let typeElement = range.startContainer as HTMLElement;
        if (range.startContainer.nodeType === 3) {
            typeElement = range.startContainer.parentElement;
        }
        if (typeElement.classList.contains("vditor-reset")) {
            typeElement = typeElement.childNodes[range.startOffset] as HTMLElement;
        }

        const headingElement = hasClosestByHeadings(typeElement);
        if (headingElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["headings"]);
        }
        const quoteElement = hasClosestByMatchTag(typeElement, "BLOCKQUOTE");
        if (quoteElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["quote"]);
        }
        const strongElement = hasClosestByAttribute(typeElement, "data-type", "strong");
        if (strongElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["bold"]);
        }
        const emElement = hasClosestByAttribute(typeElement, "data-type", "em");
        if (emElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["italic"]);
        }
        const sElement = hasClosestByAttribute(typeElement, "data-type", "s");
        if (sElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["strike"]);
        }
        const aElement = hasClosestByAttribute(typeElement, "data-type", "a");
        if (aElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["link"]);
        }
        const ulElement = hasClosestByAttribute(typeElement, "data-type", "ul");
        if (ulElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["list"]);
        }
        const olElement = hasClosestByAttribute(typeElement, "data-type", "ol");
        if (olElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["ordered-list"]);
        }
        const taskElement = hasClosestByAttribute(typeElement, "data-type", "task");
        if (taskElement) {
            setCurrentToolbar(vditor.toolbar.elements, ["check"]);
        }
        const codeBlockElement = hasClosestByAttribute(typeElement, "data-type", "code-block");
        if (codeBlockElement) {
            disableToolbar(vditor.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote",
                "list", "ordered-list", "check", "code", "upload", "link", "table", "record"]);
            setCurrentToolbar(vditor.toolbar.elements, ["code"]);
        }
        const codeElement = hasClosestByAttribute(typeElement, "data-type", "code");
        if (codeElement) {
            disableToolbar(vditor.toolbar.elements, ["headings", "bold", "italic", "strike", "line", "quote",
                "list", "ordered-list", "check", "code", "inline-code", "upload", "link", "table", "record"]);
            setCurrentToolbar(vditor.toolbar.elements, ["inline-code"]);
        }
        const tableElement = hasClosestByAttribute(typeElement, "data-type", "table");
        if (tableElement) {
            disableToolbar(vditor.toolbar.elements, ["headings", "list", "ordered-list", "check", "line",
                "quote", "code", "table"]);
        }

    }, 200);
};