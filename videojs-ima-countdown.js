import videojs from 'video.js';
import {version as VERSION} from '../package.json';
const Component = videojs.getComponent('Component');

// Default options for the plugin.
const defaults = {
  debug: false,
  text: 'AD',
  controlBarPosition: 1
};

// class CountdownComp extends Component {
//   constructor(player, options = {}) {
//     super(player, options);
//   }

//   buildCSSClass() {
//     return 'vjs-ima-countdown';
//   }

//   createEl(tag = 'div', props = {}, attributes = {}) {
//     props = {
//       className: 'vjs-ima-countdown vjs-time-control'
//     };

//     let el = super.createEl(tag, props, attributes);

//     this.createTextEl(el);
//     this.createTimeEl(el);

//     return el;
//   }

//   createTextEl(el) {
//     this.textEl_ = videojs.createEl('span', {
//       className: 'vjs-ima-countdown-text'
//     });

//     if (el) {
//       el.appendChild(this.textEl_);
//     }

//     if (this.options_.text !== '') {
//       console.log(this.options_)
//       this.textEl_.innerHTML = this.options_.text;
//     }

//     return this.textEl_;
//   }

//   createTimeEl(el) {
//     this.timeEl_ = videojs.createEl('span', {
//       className: 'vjs-ima-countdown-time'
//     });

//     if (el) {
//       el.appendChild(this.timeEl_);
//     }

//     this.timeEl_.innerHTML = '';
//     return this.timeEl_;
//   }
// }
// videojs.registerComponent('CountdownComp', CountdownComp);

const debug = (player, value) => {
  /* eslint-disable no-console */
  if (player.countdown.debug) {
    console.info(value);
  }
  /* eslint-enable no-console */
}

function updateTime(player, remainingTime, adDurationEl) {
  // const timeRemainingEl = player.countdown.timeEl;
  const timeRemainingEl = adRemainingTimeEl(adDurationEl);

  let timeHTML = '';

  if (remainingTime !== 0) {
    let remainingMinutes = Math.floor(remainingTime / 60);
    let remainingSeconds = Math.floor(remainingTime % 60);

    if (remainingSeconds.toString().length < 2) {
      remainingSeconds = '0' + remainingSeconds;
    }

    timeHTML = `&nbsp;${remainingMinutes}:${remainingSeconds}`;
  }

  debug(player, 'IMA Countdown Remaining: ' + timeHTML);

  timeRemainingEl.innerHTML = timeHTML;
}

// function addControl(player) {
//   const adControlBar = player.getChild('ControlBar');

//   return adControlBar.addChild(
// 		'Countdown',
// 		player.countdown,
// 		[player.countdown.controlBarPosition]
// 	);
// }

const adRemainingTimeEl = (adDurationEl) => {
  return adDurationEl.querySelector(".vjs-ima-countdown-time");
}

const adCountAdsEl = (adDurationEl) => {
  return adDurationEl.querySelector(".vjs-ima-countdown-ads-count");
}

const createAdDurationEl = () => {
  var countdownDiv = document.createElement("div");
  countdownDiv.className = "vjs-ima-countdown vjs-time-control";

  var adTxtEl = document.createElement("span");
  adTxtEl.className = "vjs-ima-countdown-child vjs-ima-countdown-text";
  adTxtEl.innerText = defaults.text;
  countdownDiv.appendChild(adTxtEl);

  var adsCount = document.createElement("span");
  adsCount.className = "vjs-ima-countdown-child vjs-ima-countdown-ads-count";
  adsCount.innerText = "0 of 0";
  countdownDiv.appendChild(adsCount);

  var adConectDot = document.createElement("span");
  adConectDot.className = "vjs-ima-countdown-child vjs-ima-countdown-ad-connect-dot";
  adConectDot.innerText = ".";
  countdownDiv.appendChild(adConectDot);

  var adTime = document.createElement("span");
  adTime.className = "vjs-ima-countdown-child vjs-ima-countdown-time";
  countdownDiv.appendChild(adTime);

  return countdownDiv;
}

function timeRemaining(player, adDurationEl) {
  const remainingTime = player.ima3.adsManager.getRemainingTime();

  if (player.ads.state !== 'ad-playback') {
    updateTime(player, 0, adDurationEl);
  } else {
    updateTime(player, remainingTime, adDurationEl);
  }
}

function onAdsAdStarted(player, adDurationEl) {
  debug(player, 'Start to set current ad pos and total ads');
  const countAdsEl = adCountAdsEl(adDurationEl);

  countAdsEl.innerHTML = '&nbsp;' + `${player.ads.pod.id} of ${player.ads.pod.size}`;
}

function onAdsAdEnded(player, adDurationEl) {
  debug(player, `Destroy adDuration Element`);
  const controlBar = player.controlBar.el();

  controlBar.removeChild(adDurationEl);
}

function onAdPlay(player, adDurationEl) {
  debug(player, `IMA Countdown timerInterval Started`);
  player.countdown.timerInterval = setInterval(
    timeRemaining.bind(player, player, adDurationEl), 250
  );
}

function onAdStop(player) {
  debug(player, `IMA Countdown timerInterval Stopped`);
  clearInterval(player.countdown.timerInterval);
}

function onAdLoad(player, adDurationEl) {
  // const countdown = addControl(player);

  // player.countdown.timeEl = countdown.timeEl_;

  player.on('adstart', function() {
    console.log('adstart', player);
    onAdPlay(player, adDurationEl);
  });

  player.on('ads-play', function() {
    console.log('ads-play', player);
    onAdPlay(player, adDurationEl);
  });

  player.on('adend', function() {
    console.log('adend', player);
    onAdStop(player);
  });

  player.on('ads-pause', function() {
    console.log('ads-pause', player);
    onAdStop(player);
  });

  player.on('ads-ad-started', function () {
    onAdsAdStarted(player, adDurationEl);
  });

  player.on('ads-ad-ended', function () {
    onAdsAdEnded(player, adDurationEl);
  });
}

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-ima-countdown');
  let settings = videojs.mergeOptions({}, defaults, options || {});

  settings.timerInterval = null;
  settings.timeEl = null;
  settings.timeRemaining = null;

  player.countdown = settings;

  console.log('playerlocal17', player);

  const controlBar = player.controlBar.el();
  const adDurationEl = createAdDurationEl();
  controlBar.appendChild(adDurationEl);

  // add control
  // const controlBar = player.getChild('ControlBar');
  // const Countdown = new CountdownComp(player, settings);
  // console.log('CountdownComp', Countdown)
  // controlBar.addChild(Countdown, player.countdown);
  // end add control

  player.on('ads-load', function() {
    onAdLoad(player, adDurationEl);
  });
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function imaCountdown
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const imaCountdown = function(options) {
  this.ready(() => {
    onPlayerReady(this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('imaCountdown', imaCountdown);

// Include the version number.
imaCountdown.VERSION = VERSION;

export default imaCountdown;
