export class TtsNode extends HTMLElement {
  static define() {
    if (!customElements.get("tts-node")) {
      customElements.define("tts-node", TtsNode);
    }
  }
  constructor() {
    super();
    this.synth = window.speechSynthesis;
    this.unspokenQueue = [];
  }

  connectedCallback() {
    this.setAttribute("provides", "tts");
  }

  queue(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.4;
    const preferredVoicesURIs = [
      "Microsoft Sonia Online (Natural) - English (United Kingdom)",
      "Microsoft AvaMultilingual Online (Natural) - English (United States)",
      "Arthur",
    ];

    const availableVoices = this.synth.getVoices().filter(function (v) {
      return preferredVoicesURIs.includes(v.voiceURI);
    });
    const bestVoice = availableVoices.sort(function (a, b) {
      return preferredVoicesURIs.indexOf(a.voiceURI) - preferredVoicesURIs.indexOf(b.voiceURI);
    })[0];
    if (bestVoice) utterance.voice = bestVoice;

    if (this.synth.speaking) {
      this.unspokenQueue.push(utterance);
    } else {
      this.synth.speak(utterance);
      var self = this;
      utterance.onend = function () {
        self.speakUntilEmpty();
      };
    }
  }

  speakUntilEmpty() {
    if (this.unspokenQueue.length) {
      const utterance = this.unspokenQueue.shift();
      this.synth.speak(utterance);
      var self = this;
      utterance.onend = function () {
        self.speakUntilEmpty();
      };
    }
  }

  clear() {
    this.unspokenQueue = [];
    this.synth.cancel();
  }
}
