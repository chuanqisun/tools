# Specification: JSON → TypeScript Interface Single‑Page App

---

## 1. Overview

This is a self‑contained, single‑page HTML application that lets users paste or edit JSON on the left panel and instantly see the corresponding TypeScript interface(s) generated on the right panel. It uses the [torex](https://github.com/chuanqisun/torex) library (via ESM import), CodeMirror 6 for the editors, and supports live updates, copy buttons, an external link to the torex repo, and draggable panel resizing.

---

## 2. High‑Level Requirements

| ID    | Requirement                                                                                  |
|:-----:|:---------------------------------------------------------------------------------------------|
| R1    | Single HTML page with no server‑side component.                                              |
| R2    | Left‑hand CodeMirror editor for JSON input.                                                  |
| R3    | Right‑hand CodeMirror editor for TypeScript output.                                          |
| R4    | Use `getType()` from torex (imported via `https://esm.sh/torex`) to convert JSON→TypeScript. |
| R5    | Top toolbar containing three buttons: Copy JSON, Copy TypeScript, Explore API.               |
| R6    | “Explore API” button opens the torex GitHub repository in a new tab.                         |
| R7    | Live conversion: any change in the JSON editor updates the TS view immediately.              |
| R8    | Copy buttons write the respective content to the clipboard and notify the user.              |
| R9    | A draggable vertical divider between panels for manual resizing.                             |
| R10   | Use a dark theme (One Dark) for both editors.                                                |

---

## 3. User Interface (UI) Specification

### 3.1 Layout

```
┌────────────────────────────────────────────────────────────────┐
│ Toolbar: [JSON → TS Interface]  [Copy JSON] [Copy TypeScript] │
│                                         [Explore API]         │
├────────────────────────────────────────────────────────────────┤
│ Left Panel (JSON editor) │▏ Divider ▏│ Right Panel (TS editor) │
└────────────────────────────────────────────────────────────────┘
```

- **Toolbar** (fixed height):  
  - Title label (“JSON → TS Interface”)  
  - Buttons: Copy JSON, Copy TypeScript, Explore API  
- **Main area** (flex container):  
  - **Left Panel**: JSON CodeMirror editor  
  - **Divider**: draggable vertical bar  
  - **Right Panel**: TypeScript CodeMirror editor  

### 3.2 Toolbar Buttons

| Button            | Action                                                                                  |
|-------------------|-----------------------------------------------------------------------------------------|
| **Copy JSON**     | Copy the entire JSON text (left editor) to the clipboard & show success/failure alert.  |
| **Copy TypeScript** | Copy the generated TS code (right editor) to the clipboard & show success/failure.    |
| **Explore API**   | Opens `https://github.com/chuanqisun/torex` in a new browser tab.                       |

### 3.3 Panels & Divider

- **Panels**: Occupy 100% of remaining vertical space below toolbar; overflow handled by editors.  
- **Divider**: 4 px wide, cursor changes to `col-resize` on hover, supports mouse‑drag resizing.  

---

## 4. Functional Specification

### 4.1 Initialization

1. **Import modules** via ESM:
   - `getType` from torex  
   - CodeMirror 6 packages (`@codemirror/state`, `@codemirror/view`, `@codemirror/lang-json`, `@codemirror/lang-javascript`, `@codemirror/commands`, `@codemirror/language`, `@codemirror/theme-one-dark`)  

2. **Create common extensions** for both editors:
   - Line numbers, active‑line highlighting, default keymap, One Dark theme, syntax highlighting.  

3. **Instantiate editors**:
   - **Left**: JSON mode, initial sample JSON, listener for document changes → triggers conversion.  
   - **Right**: JavaScript mode, placeholder comment.  

4. **Initial run**:
   - Parse the initial JSON and populate the right editor with generated TS.

### 4.2 Live JSON → TS Conversion

- On every document change in the left editor:
  1. Read full JSON text.
  2. Attempt `JSON.parse()`.  
     - On success: call `getType(parsedObject, { rootName: "Root" })`, get TypeScript string, update right editor.  
     - On failure: catch error and display `// Error: <message>` in the right editor.

### 4.3 Copy to Clipboard

- **Copy JSON**:
  1. Retrieve left editor text.
  2. Call `navigator.clipboard.writeText()`.
  3. On success/failure → `alert()` user.

- **Copy TypeScript**:
  1. Retrieve right editor text.
  2. Call `navigator.clipboard.writeText()`.
  3. On success/failure → `alert()` user.

### 4.4 Explore API Link

- Button click → `window.open("https://github.com/chuanqisun/torex", "_blank")`.

### 4.5 Resizable Panels

- On mousedown over divider:
  1. Record starting mouse X and left‑panel width.
  2. Add global mousemove/mouseup listeners.
  3. On mousemove: calculate new widths, enforce minimum panel width (e.g. 100 px), apply `style.width` on panels.
  4. On mouseup: remove listeners.

---

## 5. Technology & Dependencies

| Technology           | Purpose                                       | Source (ESM)                                   |
|:---------------------|:----------------------------------------------|:-----------------------------------------------|
| **torex**            | JSON→TypeScript interface conversion          | `https://esm.sh/torex`                         |
| **CodeMirror 6**     | Rich text editor framework                    | `https://esm.sh/@codemirror/...`               |
| • @codemirror/state  | Editor state management                       |                                                 |
| • @codemirror/view   | View layer, UI components                     |                                                 |
| • @codemirror/commands | Keymaps & commands                          |                                                 |
| • @codemirror/lang-json | JSON syntax support                        |                                                 |
| • @codemirror/lang-javascript | JavaScript/TypeScript mode            |                                                 |
| • @codemirror/language | Syntax highlighting                         |                                                 |
| • @codemirror/theme-one-dark | One Dark styling theme                 |                                                 |

_No build tools or bundlers needed; runs purely in modern browsers supporting ES modules._

---

## 6. File Structure

Since it’s a single‑page app, there is just one file:

```
index.html
```

---

## 7. Usage

1. **Open** `index.html` in a modern browser (Chrome, Firefox, Edge, Safari).  
2. **Edit** or paste JSON in the left panel.  
3. **View** the generated TypeScript in the right panel instantly.  
4. **Copy** JSON or TS via toolbar buttons.  
5. **Explore** the torex API on GitHub via the “Explore API” button.  
6. **Resize** panels by dragging the divider.

---

### End of Specification