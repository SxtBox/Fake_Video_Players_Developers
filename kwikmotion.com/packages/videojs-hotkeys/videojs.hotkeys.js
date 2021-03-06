/* videojs-hotkeys v0.2.20 - https://github.com/ctd1500/videojs-hotkeys */ ! function(e, t) {
    "function" == typeof define && define.amd ? define("videojs-hotkeys", ["video.js"], function(e) {
        return t(e.default || e)
    }) : "undefined" != typeof module && module.exports ? module.exports = t(require("video.js")) : t(videojs)
}(0, function(e) {
    "use strict";
    "undefined" != typeof window && (window.videojs_hotkeys = {
        version: "0.2.20"
    });
    (e.registerPlugin || e.plugin)("hotkeys", function(t) {
        var r = this,
            n = r.el(),
            o = document,
            u = {
                volumeStep: .1,
                seekStep: 5,
                enableMute: !0,
                enableVolumeScroll: !0,
                enableFullscreen: !0,
                enableNumbers: !0,
                enableJogStyle: !1,
                alwaysCaptureHotkeys: !1,
                enableModifiersForNumbers: !0,
                enableInactiveFocus: !0,
                skipInitialFocus: !1,
                playPauseKey: function(e) {
                    return 32 === e.which || 179 === e.which
                },
                rewindKey: function(e) {
                    return 37 === e.which || 177 === e.which
                },
                forwardKey: function(e) {
                    return 39 === e.which || 176 === e.which
                },
                volumeUpKey: function(e) {
                    return 38 === e.which
                },
                volumeDownKey: function(e) {
                    return 40 === e.which
                },
                muteKey: function(e) {
                    return 77 === e.which
                },
                fullscreenKey: function(e) {
                    return 70 === e.which
                },
                customKeys: {}
            },
            l = e.mergeOptions || e.util.mergeOptions,
            i = (t = l(u, t || {})).volumeStep,
            a = t.seekStep,
            c = t.enableMute,
            s = t.enableVolumeScroll,
            m = t.enableFullscreen,
            y = t.enableNumbers,
            f = t.enableJogStyle,
            v = t.alwaysCaptureHotkeys,
            d = t.enableModifiersForNumbers,
            p = t.enableInactiveFocus,
            b = t.skipInitialFocus;
        n.hasAttribute("tabIndex") || n.setAttribute("tabIndex", "-1"), n.style.outline = "none", !v && r.autoplay() || b || r.one("play", function() {
            n.focus()
        }), p && r.on("userinactive", function() {
            var e = function() {
                    clearTimeout(t)
                },
                t = setTimeout(function() {
                    r.off("useractive", e), o.activeElement.parentElement == n.querySelector(".vjs-control-bar") && n.focus()
                }, 10);
            r.one("useractive", e)
        }), r.on("play", function() {
            var e = n.querySelector(".iframeblocker");
            e && "" === e.style.display && (e.style.display = "block", e.style.bottom = "39px")
        });
        var h = function(e) {
                if (r.controls()) {
                    var t = e.relatedTarget || e.toElement || o.activeElement;
                    if ((v || t == n || t == n.querySelector(".vjs-tech") || t == n.querySelector(".iframeblocker") || t == n.querySelector(".vjs-control-bar")) && s) {
                        e = window.event || e;
                        var u = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
                        e.preventDefault(), 1 == u ? r.volume(r.volume() + i) : -1 == u && r.volume(r.volume() - i)
                    }
                }
            },
            w = function(e, r) {
                return t.playPauseKey(e, r) ? 1 : t.rewindKey(e, r) ? 2 : t.forwardKey(e, r) ? 3 : t.volumeUpKey(e, r) ? 4 : t.volumeDownKey(e, r) ? 5 : t.muteKey(e, r) ? 6 : t.fullscreenKey(e, r) ? 7 : void 0
            };
        return r.on("keydown", function(e) {
            var u, l, s = e.which,
                p = e.preventDefault,
                b = r.duration();
            if (r.controls()) {
                var h = o.activeElement;
                if (v || h == n || h == n.querySelector(".vjs-tech") || h == n.querySelector(".vjs-control-bar") || h == n.querySelector(".iframeblocker")) switch (w(e, r)) {
                    case 1:
                        p(), v && e.stopPropagation(), r.paused() ? r.play() : r.pause();
                        break;
                    case 2:
                        u = !r.paused(), p(), u && r.pause(), l = r.currentTime() - a, r.currentTime() <= a && (l = 0), r.currentTime(l), u && r.play();
                        break;
                    case 3:
                        u = !r.paused(), p(), u && r.pause(), (l = r.currentTime() + a) >= b && (l = u ? b - .001 : b), r.currentTime(l), u && r.play();
                        break;
                    case 5:
                        p(), f ? (l = r.currentTime() - 1, r.currentTime() <= 1 && (l = 0), r.currentTime(l)) : r.volume(r.volume() - i);
                        break;
                    case 4:
                        p(), f ? ((l = r.currentTime() + 1) >= b && (l = b), r.currentTime(l)) : r.volume(r.volume() + i);
                        break;
                    case 6:
                        c && r.muted(!r.muted());
                        break;
                    case 7:
                        m && (r.isFullscreen() ? r.exitFullscreen() : r.requestFullscreen());
                        break;
                    default:
                        if ((s > 47 && s < 59 || s > 95 && s < 106) && (d || !(e.metaKey || e.ctrlKey || e.altKey)) && y) {
                            var k = 48;
                            s > 95 && (k = 96);
                            var K = s - k;
                            p(), r.currentTime(r.duration() * K * .1)
                        }
                        for (var S in t.customKeys) {
                            var T = t.customKeys[S];
                            T && T.key && T.handler && T.key(e) && (p(), T.handler(r, t, e))
                        }
                }
            }
        }), r.on("dblclick", function(e) {
            if (r.controls()) {
                var t = e.relatedTarget || e.toElement || o.activeElement;
                t != n && t != n.querySelector(".vjs-tech") && t != n.querySelector(".iframeblocker") || m && (r.isFullscreen() ? r.exitFullscreen() : r.requestFullscreen())
            }
        }), r.on("mousewheel", h), r.on("DOMMouseScroll", h), this
    })
});