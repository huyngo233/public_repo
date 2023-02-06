(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsImaCountdown = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
  (function (global){
  /* jshint latedef: nofunc */
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
  
  var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
  
  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  
  var _videoJs = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);
  
  var _videoJs2 = _interopRequireDefault(_videoJs);
  
  var Component = _videoJs2['default'].getComponent('Component');
  
  // Default options for the plugin.
  var defaults = {
    debug: false,
    text: 'AD',
    controlBarPosition: 1,
    isActive: false
  };
  
  var Countdown = (function (_Component) {
    _inherits(Countdown, _Component);
  
    function Countdown(player, options) {
      _classCallCheck(this, Countdown);
  
      _get(Object.getPrototypeOf(Countdown.prototype), 'constructor', this).call(this, player, options);
    }
  
    _createClass(Countdown, [{
      key: 'buildCSSClass',
      value: function buildCSSClass() {
        return 'vjs-ima-countdown';
      }
    }, {
      key: 'createEl',
      value: function createEl() {
        var tag = arguments.length <= 0 || arguments[0] === undefined ? 'div' : arguments[0];
        var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var attributes = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  
        props = {
          className: 'vjs-ima-countdown vjs-time-control'
        };
  
        var el = _get(Object.getPrototypeOf(Countdown.prototype), 'createEl', this).call(this, tag, props, attributes);
  
        this.createTextEl(el);
        this.createCurrentAdPosEl(el);
        this.createBelongAdEl(el);
        this.createTotalAdsEl(el);
        this.createConnectSizeAndTime(el);
        this.createTimeEl(el);
  
        return el;
      }
    }, {
      key: 'createTextEl',
      value: function createTextEl(el) {
        this.textEl_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-countdown-text'
        });
  
        if (el) {
          el.appendChild(this.textEl_);
        }
  
        if (this.options_.text !== '') {
          this.textEl_.innerHTML = this.options_.text;
        }
  
        return this.textEl_;
      }
    }, {
      key: 'createTimeEl',
      value: function createTimeEl(el) {
        this.timeEl_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-countdown-time'
        });
  
        if (el) {
          el.appendChild(this.timeEl_);
        }
  
        this.timeEl_.innerHTML = '';
        return this.timeEl_;
      }
    }, {
      key: 'createCurrentAdPosEl',
      value: function createCurrentAdPosEl(el) {
        this.currentAdPosEl_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-current-ad-pos'
        });
  
        if (el) {
          el.appendChild(this.currentAdPosEl_);
        }
  
        this.currentAdPosEl_.innerHTML = '';
        return this.currentAdPosEl_;
      }
    }, {
      key: 'createBelongAdEl',
      value: function createBelongAdEl(el) {
        this.belongAd_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-belong-ad'
        });
  
        if (el) {
          el.appendChild(this.belongAd_);
        }
  
        this.belongAd_.innerHTML = '&nbsp;' + 'of' + '&nbsp;';
        return this.belongAd_;
      }
    }, {
      key: 'createTotalAdsEl',
      value: function createTotalAdsEl(el) {
        this.totalAdsEl_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-total-ads'
        });
  
        if (el) {
          el.appendChild(this.totalAdsEl_);
        }
  
        this.totalAdsEl_.innerHTML = '';
        return this.totalAdsEl_;
      }
    }, {
      key: 'createConnectSizeAndTime',
      value: function createConnectSizeAndTime(el) {
        this.connectSign_ = _videoJs2['default'].createEl('span', {
          className: 'vjs-ima-onnect-size-and-time'
        });
  
        if (el) {
          el.appendChild(this.connectSign_);
        }
  
        this.connectSign_.innerHTML = '&nbsp;' + '.' + '&nbsp;';
        return this.connectSign_;
      }
    }
  ]);
  
    return Countdown;
  })(Component);
  
  _videoJs2['default'].registerComponent('Countdown', Countdown);
  
  function debug(player, value) {
    /* eslint-disable no-console */
    if (player.countdown.debug) {
      console.info(value);
    }
    /* eslint-enable no-console */
  }
  
  function updateTime(player, remainingTime) {
    var timeRemainingEl = player.countdown.timeEl;
    var timeHTML = '';
  
    if (remainingTime !== 0) {
      var remainingMinutes = Math.floor(remainingTime / 60);
      var remainingSeconds = Math.floor(remainingTime % 60);
  
      if (remainingSeconds.toString().length < 2) {
        remainingSeconds = '0' + remainingSeconds;
      }
  
      timeHTML = '&nbsp;' + remainingMinutes + ':' + remainingSeconds;
    }
  
    debug(player, 'IMA Countdown Remaining: ' + timeHTML);
  
    timeRemainingEl.innerHTML = timeHTML;
  }
  
  function addControl(player) {
    var adControlBar = player.ima3.adControlBar;
  
    return adControlBar.addChild('Countdown', player.countdown, [player.countdown.controlBarPosition]);
  }
  
  function timeRemaining(player) {
    var remainingTime = player.ima3.adsManager.getRemainingTime();
  
    if (player.ads.state !== 'ad-playback') {
      updateTime(player, 0);
    } else {
      updateTime(player, remainingTime);
    }
  }

  function onAdStart(player) {
    console.log('play', player);
    console.log('player.ads', player.ads);
    console.log('player.ads.pod', player.ads.pod);

    // const currentAdPosEl = player.countdown.currentAdPosEl;
    // const totalAdsEl = player.countdown.totalAdsEl;

    // currentAdPosEl.innerHTML = player.ads.pod.id;
    // totalAdsEl.innerHTML = player.ads.pod.size;
  }
  
  function onAdPlay(player) {
    debug(player, 'IMA Countdown timerInterval Started');
    player.countdown.timerInterval = setInterval(timeRemaining.bind(player, player), 250);
  }
  
  function onAdStop(player) {
    debug(player, 'IMA Countdown timerInterval Stopped');
    clearInterval(player.countdown.timerInterval);
  }
  
  function onAdLoad(player) {
    // Only load once to the player
    if (!player.countdown.isActive) {
  
      player.countdown.isActive = true;
  
      var countdown = addControl(player);
  
      player.on('adstart', function () {
        onAdPlay(player);
      });
  
      player.on('ads-play', function () {
        onAdPlay(player);
      });
  
      player.on('adend', function () {
        onAdStop(player);
      });
  
      player.on('ads-pause', function () {
        onAdStop(player);
      });

      player.on('ads-pod-started', function () {
        onAdStart(player);
      });
  
      player.countdown.timeEl = countdown.timeEl_;
      player.countdown.currentAdPosEl = countdown.currentAdPosEl_;
      player.countdown.totalAdsEl = countdown.totalAdsEl_;
    }
  }
  
  /**
   * A video.js plugin.
   *
   * In the plugin function, the value of `this` is a video.js `Player`
   * instance. You cannot rely on the player being in a "ready" state here,
   * depending on how the plugin is invoked. This may or may not be important
   * to you; if not, remove the wait for "ready"!
   *
   * @function imaCountdown
   * @param		{Object} [options={}]
   * An object of options left to the plugin author to define.
   */
  var imaCountdown = function imaCountdown(options) {
    var settings = _videoJs2['default'].mergeOptions({}, defaults, options || {});
  
    settings.timerInterval = null;
    settings.timeEl = null;
    settings.timeRemaining = null;
    settings.currentAdPosEl = null;
    settings.totalAdsEl = null;
  
    this.countdown = settings;
  
    this.on('ads-load', function () {
      onAdLoad(this);
    });
  };
  
  // Register the plugin with video.js.
  _videoJs2['default'].plugin('imaCountdown', imaCountdown);
  
  // Include the version number.
  imaCountdown.VERSION = '2.0.0';
  exports['default'] = imaCountdown;
  module.exports = exports['default'];
  
  }).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
  
  },{}]},{},[1])(1)
  });
  //# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJDOi9EZXYvdmlkZW9qcy1pbWEtY291bnRkb3duL3NyYy9wbHVnaW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQ0VvQixVQUFVOzs7O0FBQzlCLElBQU0sU0FBUyxHQUFHLHFCQUFRLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O0FBR3BELElBQU0sUUFBUSxHQUFHO0FBQ2YsT0FBSyxFQUFFLEtBQUs7QUFDWixNQUFJLEVBQUUsZUFBZTtBQUNyQixvQkFBa0IsRUFBRSxDQUFDO0FBQ3RCLFVBQVEsRUFBRSxLQUFLO0NBQ2YsQ0FBQzs7SUFFSSxTQUFTO1lBQVQsU0FBUzs7QUFDRixXQURQLFNBQVMsQ0FDRCxNQUFNLEVBQUUsT0FBTyxFQUFFOzBCQUR6QixTQUFTOztBQUVYLCtCQUZFLFNBQVMsNkNBRUwsTUFBTSxFQUFFLE9BQU8sRUFBRTtHQUN4Qjs7ZUFIRyxTQUFTOztXQUtBLHlCQUFHO0FBQ2QsYUFBTyxtQkFBbUIsQ0FBQztLQUM1Qjs7O1dBRU8sb0JBQTJDO1VBQTFDLEdBQUcseURBQUcsS0FBSztVQUFFLEtBQUsseURBQUcsRUFBRTtVQUFFLFVBQVUseURBQUcsRUFBRTs7QUFDL0MsV0FBSyxHQUFHO0FBQ04saUJBQVMsRUFBRSxvQ0FBb0M7T0FDaEQsQ0FBQzs7QUFFRixVQUFJLEVBQUUsOEJBZEosU0FBUywwQ0FjYSxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDOztBQUVoRCxVQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLFVBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRXRCLGFBQU8sRUFBRSxDQUFDO0tBQ1g7OztXQUVXLHNCQUFDLEVBQUUsRUFBRTtBQUNmLFVBQUksQ0FBQyxPQUFPLEdBQUcscUJBQVEsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUN0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QUU7QUFDckMsTUFBSSxRQUFRLEdBQUcscUJBQVEsWUFBWSxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDOztBQUVqRSxVQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztBQUM5QixVQUFRLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUN2QixVQUFRLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFOUIsTUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7O0FBRTFCLE1BQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVc7QUFDN0IsWUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ2hCLENBQUMsQ0FBQztDQUNKLENBQUM7OztBQUdGLHFCQUFRLE1BQU0sQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7OztBQUc3QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztxQkFDdEIsWUFBWSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiBqc2hpbnQgbGF0ZWRlZjogbm9mdW5jICovXHJcblxyXG5pbXBvcnQgdmlkZW9qcyBmcm9tICd2aWRlby5qcyc7XHJcbmNvbnN0IENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcclxuXHJcbi8vIERlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHBsdWdpbi5cclxuY29uc3QgZGVmYXVsdHMgPSB7XHJcbiAgZGVidWc6IGZhbHNlLFxyXG4gIHRleHQ6ICdBZHZlcnRpc2VtZW50JyxcclxuICBjb250cm9sQmFyUG9zaXRpb246IDEsXHJcblx0aXNBY3RpdmU6IGZhbHNlXHJcbn07XHJcblxyXG5jbGFzcyBDb3VudGRvd24gZXh0ZW5kcyBDb21wb25lbnQge1xyXG4gIGNvbnN0cnVjdG9yKHBsYXllciwgb3B0aW9ucykge1xyXG4gICAgc3VwZXIocGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcblxyXG4gIGJ1aWxkQ1NTQ2xhc3MoKSB7XHJcbiAgICByZXR1cm4gJ3Zqcy1pbWEtY291bnRkb3duJztcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVsKHRhZyA9ICdkaXYnLCBwcm9wcyA9IHt9LCBhdHRyaWJ1dGVzID0ge30pIHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBjbGFzc05hbWU6ICd2anMtaW1hLWNvdW50ZG93biB2anMtdGltZS1jb250cm9sJ1xyXG4gICAgfTtcclxuXHJcbiAgICBsZXQgZWwgPSBzdXBlci5jcmVhdGVFbCh0YWcsIHByb3BzLCBhdHRyaWJ1dGVzKTtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZVRleHRFbChlbCk7XHJcbiAgICB0aGlzLmNyZWF0ZVRpbWVFbChlbCk7XHJcblxyXG4gICAgcmV0dXJuIGVsO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGV4dEVsKGVsKSB7XHJcbiAgICB0aGlzLnRleHRFbF8gPSB2aWRlb2pzLmNyZWF0ZUVsKCdzcGFuJywge1xyXG4gICAgICBjbGFzc05hbWU6ICd2anMtaW1hLWNvdW50ZG93bi10ZXh0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGVsKSB7XHJcbiAgICAgIGVsLmFwcGVuZENoaWxkKHRoaXMudGV4dEVsXyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9uc18udGV4dCAhPT0gJycpIHtcclxuICAgICAgdGhpcy50ZXh0RWxfLmlubmVySFRNTCA9IHRoaXMub3B0aW9uc18udGV4dDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcy50ZXh0RWxfO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlVGltZUVsKGVsKSB7XHJcbiAgICB0aGlzLnRpbWVFbF8gPSB2aWRlb2pzLmNyZWF0ZUVsKCdzcGFuJywge1xyXG4gICAgICBjbGFzc05hbWU6ICd2anMtaW1hLWNvdW50ZG93bi10aW1lJ1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGVsKSB7XHJcbiAgICAgIGVsLmFwcGVuZENoaWxkKHRoaXMudGltZUVsXyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy50aW1lRWxfLmlubmVySFRNTCA9ICcnO1xyXG4gICAgcmV0dXJuIHRoaXMudGltZUVsXztcclxuICB9XHJcbn1cclxudmlkZW9qcy5yZWdpc3RlckNvbXBvbmVudCgnQ291bnRkb3duJywgQ291bnRkb3duKTtcclxuXHJcbmZ1bmN0aW9uIGRlYnVnKHBsYXllciwgdmFsdWUpIHtcclxuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXHJcbiAgaWYgKHBsYXllci5jb3VudGRvd24uZGVidWcpIHtcclxuICAgIGNvbnNvbGUuaW5mbyh2YWx1ZSk7XHJcbiAgfVxyXG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUaW1lKHBsYXllciwgcmVtYWluaW5nVGltZSkge1xyXG4gIGNvbnN0IHRpbWVSZW1haW5pbmdFbCA9IHBsYXllci5jb3VudGRvd24udGltZUVsO1xyXG4gIGxldCB0aW1lSFRNTCA9ICcnO1xyXG5cclxuICBpZiAocmVtYWluaW5nVGltZSAhPT0gMCkge1xyXG4gICAgbGV0IHJlbWFpbmluZ01pbnV0ZXMgPSBNYXRoLmZsb29yKHJlbWFpbmluZ1RpbWUgLyA2MCk7XHJcbiAgICBsZXQgcmVtYWluaW5nU2Vjb25kcyA9IE1hdGguZmxvb3IocmVtYWluaW5nVGltZSAlIDYwKTtcclxuXHJcbiAgICBpZiAocmVtYWluaW5nU2Vjb25kcy50b1N0cmluZygpLmxlbmd0aCA8IDIpIHtcclxuICAgICAgcmVtYWluaW5nU2Vjb25kcyA9ICcwJyArIHJlbWFpbmluZ1NlY29uZHM7XHJcbiAgICB9XHJcblxyXG4gICAgdGltZUhUTUwgPSBgJm5ic3A7JHtyZW1haW5pbmdNaW51dGVzfToke3JlbWFpbmluZ1NlY29uZHN9YDtcclxuICB9XHJcblxyXG4gIGRlYnVnKHBsYXllciwgJ0lNQSBDb3VudGRvd24gUmVtYWluaW5nOiAnICsgdGltZUhUTUwpO1xyXG5cclxuICB0aW1lUmVtYWluaW5nRWwuaW5uZXJIVE1MID0gdGltZUhUTUw7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZENvbnRyb2wocGxheWVyKSB7XHJcbiAgY29uc3QgYWRDb250cm9sQmFyID0gcGxheWVyLmltYTMuYWRDb250cm9sQmFyO1xyXG5cclxuICByZXR1cm4gYWRDb250cm9sQmFyLmFkZENoaWxkKFxyXG5cdFx0J0NvdW50ZG93bicsXHJcblx0XHRwbGF5ZXIuY291bnRkb3duLFxyXG5cdFx0W3BsYXllci5jb3VudGRvd24uY29udHJvbEJhclBvc2l0aW9uXVxyXG5cdCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRpbWVSZW1haW5pbmcocGxheWVyKSB7XHJcbiAgY29uc3QgcmVtYWluaW5nVGltZSA9IHBsYXllci5pbWEzLmFkc01hbmFnZXIuZ2V0UmVtYWluaW5nVGltZSgpO1xyXG5cclxuICBpZiAocGxheWVyLmFkcy5zdGF0ZSAhPT0gJ2FkLXBsYXliYWNrJykge1xyXG4gICAgdXBkYXRlVGltZShwbGF5ZXIsIDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1cGRhdGVUaW1lKHBsYXllciwgcmVtYWluaW5nVGltZSk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBvbkFkUGxheShwbGF5ZXIpIHtcclxuICBkZWJ1ZyhwbGF5ZXIsIGBJTUEgQ291bnRkb3duIHRpbWVySW50ZXJ2YWwgU3RhcnRlZGApO1xyXG4gIHBsYXllci5jb3VudGRvd24udGltZXJJbnRlcnZhbCA9IHNldEludGVydmFsKFxyXG4gICAgdGltZVJlbWFpbmluZy5iaW5kKHBsYXllciwgcGxheWVyKSwgMjUwXHJcbiAgKTtcclxufVxyXG5cclxuZnVuY3Rpb24gb25BZFN0b3AocGxheWVyKSB7XHJcbiAgZGVidWcocGxheWVyLCBgSU1BIENvdW50ZG93biB0aW1lckludGVydmFsIFN0b3BwZWRgKTtcclxuICBjbGVhckludGVydmFsKHBsYXllci5jb3VudGRvd24udGltZXJJbnRlcnZhbCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uQWRMb2FkKHBsYXllcikge1xuXHQvLyBPbmx5IGxvYWQgb25jZSB0byB0aGUgcGxheWVyXHJcblx0aWYoICFwbGF5ZXIuY291bnRkb3duLmlzQWN0aXZlICkge1xyXG5cclxuXHRcdHBsYXllci5jb3VudGRvd24uaXNBY3RpdmUgPSB0cnVlO1xuXHJcblx0XHRjb25zdCBjb3VudGRvd24gPSBhZGRDb250cm9sKHBsYXllcik7XHJcblxyXG5cdCAgcGxheWVyLm9uKCdhZHN0YXJ0JywgZnVuY3Rpb24oKSB7XHJcblx0ICAgIG9uQWRQbGF5KHBsYXllcik7XHJcblx0ICB9KTtcclxuXHJcblx0ICBwbGF5ZXIub24oJ2Fkcy1wbGF5JywgZnVuY3Rpb24oKSB7XHJcblx0ICAgIG9uQWRQbGF5KHBsYXllcik7XHJcblx0ICB9KTtcclxuXHJcblx0ICBwbGF5ZXIub24oJ2FkZW5kJywgZnVuY3Rpb24oKSB7XHJcblx0ICAgIG9uQWRTdG9wKHBsYXllcik7XHJcblx0ICB9KTtcclxuXHJcblx0ICBwbGF5ZXIub24oJ2Fkcy1wYXVzZScsIGZ1bmN0aW9uKCkge1xyXG5cdCAgICBvbkFkU3RvcChwbGF5ZXIpO1xyXG5cdCAgfSk7XHJcblxyXG5cdFx0cGxheWVyLmNvdW50ZG93bi50aW1lRWwgPSBjb3VudGRvd24udGltZUVsXztcclxuXHR9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBIHZpZGVvLmpzIHBsdWdpbi5cclxuICpcclxuICogSW4gdGhlIHBsdWdpbiBmdW5jdGlvbiwgdGhlIHZhbHVlIG9mIGB0aGlzYCBpcyBhIHZpZGVvLmpzIGBQbGF5ZXJgXHJcbiAqIGluc3RhbmNlLiBZb3UgY2Fubm90IHJlbHkgb24gdGhlIHBsYXllciBiZWluZyBpbiBhIFwicmVhZHlcIiBzdGF0ZSBoZXJlLFxyXG4gKiBkZXBlbmRpbmcgb24gaG93IHRoZSBwbHVnaW4gaXMgaW52b2tlZC4gVGhpcyBtYXkgb3IgbWF5IG5vdCBiZSBpbXBvcnRhbnRcclxuICogdG8geW91OyBpZiBub3QsIHJlbW92ZSB0aGUgd2FpdCBmb3IgXCJyZWFkeVwiIVxyXG4gKlxyXG4gKiBAZnVuY3Rpb24gaW1hQ291bnRkb3duXHJcbiAqIEBwYXJhbVx0XHR7T2JqZWN0fSBbb3B0aW9ucz17fV1cclxuICogQW4gb2JqZWN0IG9mIG9wdGlvbnMgbGVmdCB0byB0aGUgcGx1Z2luIGF1dGhvciB0byBkZWZpbmUuXHJcbiAqL1xyXG5jb25zdCBpbWFDb3VudGRvd24gPSBmdW5jdGlvbihvcHRpb25zKSB7XHJcbiAgbGV0IHNldHRpbmdzID0gdmlkZW9qcy5tZXJnZU9wdGlvbnMoe30sIGRlZmF1bHRzLCBvcHRpb25zIHx8IHt9KTtcclxuXHJcbiAgc2V0dGluZ3MudGltZXJJbnRlcnZhbCA9IG51bGw7XHJcbiAgc2V0dGluZ3MudGltZUVsID0gbnVsbDtcclxuICBzZXR0aW5ncy50aW1lUmVtYWluaW5nID0gbnVsbDtcclxuXHJcbiAgdGhpcy5jb3VudGRvd24gPSBzZXR0aW5ncztcclxuXHJcbiAgdGhpcy5vbignYWRzLWxvYWQnLCBmdW5jdGlvbigpIHtcclxuICAgIG9uQWRMb2FkKHRoaXMpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gUmVnaXN0ZXIgdGhlIHBsdWdpbiB3aXRoIHZpZGVvLmpzLlxyXG52aWRlb2pzLnBsdWdpbignaW1hQ291bnRkb3duJywgaW1hQ291bnRkb3duKTtcclxuXHJcbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxyXG5pbWFDb3VudGRvd24uVkVSU0lPTiA9ICdfX1ZFUlNJT05fXyc7XHJcbmV4cG9ydCBkZWZhdWx0IGltYUNvdW50ZG93bjtcclxuIl19
