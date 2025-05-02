Write a single HTML file showing 17 logos evolving following the game of life rules.
<requirements>
  <format>Single HTML file implement</format>
  <code>Vanilla JS, minimum CSS</code>
  <layout>Put the logos on one big canvas in a 5 X 5 grid. In this shape
* * * * *
*       *
*   *   *
*       *
* * * * *
The "gutter" between logos should be 14 cells
The "padding" for the entire canvas should be 14 cells
  </layout>
  <behavior>Reset button, Step button, and Play/Pause toggle button</behavior>
  <canvas>Make sure all the logos share one canvas and so they can run into each other</canvas>
  <interaction>Let user dynamically adjust the gapping between the logos (default to 14) before the game starts. User can always click "reset" again to reset the game to the latest gapping. Let the user dynamically adjust the simulation speed (delay between steps in milliseconds, default to 180).
  <style>Light theme. Only use white/black/grey colors</style>
  <responsive>Make sure the canvas takes full width and height (with some padding so it doesn't touch screen edge. If users add more gapping, the canvas grid just becomes denser without expanding in size</responsive>
<requirements>

I have the following logos as bitmaps:
```js
const logos = [
  {
    groupName: "camera culture",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,1,1],
      [1,0,1,0,0,0,0],
      [1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "fluid interfaces",
    logo: [
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "affective computing",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,1,0,0,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "biomechatronics",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "changing places",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,1,1,0],
      [1,0,1,0,0,1,0],
      [1,0,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "civic media",
    logo: [
      [1,1,1,1,1,0,0],
      [0,0,0,0,1,0,0],
      [1,1,1,0,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,0,1],
    ],
  },
  {
    groupName: "design fiction",
    logo: [
      [1,0,0,1,0,0,0],
      [1,0,0,1,0,0,0],
      [1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0],
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "human dynamics",
    logo: [
      [0,1,1,1,1,1,0],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [0,0,0,1,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "lifelong kindergarten",
    logo: [
      [1,0,1,0,0,0,1],
      [1,0,1,0,0,1,1],
      [1,0,1,1,1,0,0],
      [1,0,1,0,0,1,1],
      [1,0,1,0,0,0,1],
      [1,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
  {
    groupName: "mit media lab",
    logo: [
      [1,1,1,1,0,0,0],
      [0,0,0,1,0,0,0],
      [0,0,0,1,0,0,0],
      [1,0,0,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,0,0,1],
    ],
  },
  {
    groupName: "macro connections",
    logo: [
      [0,0,1,1,1,1,1],
      [0,0,1,0,0,0,0],
      [1,1,1,0,0,0,0],
      [1,0,0,1,1,1,1],
      [1,0,0,1,0,0,0],
      [1,0,0,1,0,0,0],
      [1,0,0,1,1,1,1],
    ],
  },
  {
    groupName: "mediated matter",
    logo: [
      [1,1,1,1,1,0,0],
      [0,0,0,0,1,0,0],
      [1,1,1,0,1,1,1],
      [0,0,1,0,0,0,1],
      [0,0,1,1,1,0,1],
      [0,0,0,0,1,0,1],
      [0,0,0,0,1,0,1],
    ],
  },
  {
    groupName: "molecular machines",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
      [1,0,0,1,0,0,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
      [1,0,0,1,0,0,1],
    ],
  },
  {
    groupName: "object-based media",
    logo: [
      [1,1,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,1,1],
      [0,0,0,0,0,0,0],
      [1,1,1,1,1,1,1],
      [1,0,0,1,0,0,1],
    ],
  },
  {
    groupName: "opera of the future",
    logo: [
      [1,1,1,1,1,1,1],
      [0,0,0,0,1,0,1],
      [1,1,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,1,1,0,1,0,1],
    ],
  },
  {
    groupName: "personal robots",
    logo: [
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,1],
      [1,1,1,1,1,1,1],
      [1,0,0,0,0,0,0],
      [1,0,1,1,0,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,1,1,1,1],
    ],
  },
  {
    groupName: "playful systems",
    logo: [
      [1,1,1,0,1,1,1],
      [1,0,1,0,1,0,0],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,1],
      [1,0,1,0,1,1,1],
      [1,0,1,0,0,0,0],
      [1,1,1,1,1,1,1],
    ],
  },
];
```