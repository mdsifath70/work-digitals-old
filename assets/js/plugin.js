/*
====================================================
Typed js file
====================================================
*/

/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */
(function(t, e) { "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.Typed = e() : t.Typed = e() })(this, function() {
    return function(t) {
        function e(n) { if (s[n]) return s[n].exports; var i = s[n] = { exports: {}, id: n, loaded: !1 }; return t[n].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports }
        var s = {};
        return e.m = t, e.c = s, e.p = "", e(0)
    }([function(t, e, s) {
        "use strict";

        function n(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(e, "__esModule", { value: !0 });
        var i = function() {
                function t(t, e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, s, n) { return s && t(e.prototype, s), n && t(e, n), e }
            }(),
            r = s(1),
            o = s(3),
            a = function() {
                function t(e, s) { n(this, t), r.initializer.load(this, s, e), this.begin() }
                return i(t, [{ key: "toggle", value: function() { this.pause.status ? this.start() : this.stop() } }, { key: "stop", value: function() { this.typingComplete || this.pause.status || (this.toggleBlinking(!0), this.pause.status = !0, this.options.onStop(this.arrayPos, this)) } }, { key: "start", value: function() { this.typingComplete || this.pause.status && (this.pause.status = !1, this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos), this.options.onStart(this.arrayPos, this)) } }, { key: "destroy", value: function() { this.reset(!1), this.options.onDestroy(this) } }, {
                    key: "reset",
                    value: function() {
                        var t = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                        clearInterval(this.timeout), this.replaceText(""), this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), this.cursor = null), this.strPos = 0, this.arrayPos = 0, this.curLoop = 0, t && (this.insertCursor(), this.options.onReset(this), this.begin())
                    }
                }, {
                    key: "begin",
                    value: function() {
                        var t = this;
                        this.options.onBegin(this), this.typingComplete = !1, this.shuffleStringsIfNeeded(this), this.insertCursor(), this.bindInputFocusEvents && this.bindFocusEvents(), this.timeout = setTimeout(function() { t.currentElContent && 0 !== t.currentElContent.length ? t.backspace(t.currentElContent, t.currentElContent.length) : t.typewrite(t.strings[t.sequence[t.arrayPos]], t.strPos) }, this.startDelay)
                    }
                }, {
                    key: "typewrite",
                    value: function(t, e) {
                        var s = this;
                        this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                        var n = this.humanizer(this.typeSpeed),
                            i = 1;
                        return this.pause.status === !0 ? void this.setPauseStatus(t, e, !0) : void(this.timeout = setTimeout(function() {
                            e = o.htmlParser.typeHtmlChars(t, e, s);
                            var n = 0,
                                r = t.substr(e);
                            if ("^" === r.charAt(0) && /^\^\d+/.test(r)) {
                                var a = 1;
                                r = /\d+/.exec(r)[0], a += r.length, n = parseInt(r), s.temporaryPause = !0, s.options.onTypingPaused(s.arrayPos, s), t = t.substring(0, e) + t.substring(e + a), s.toggleBlinking(!0)
                            }
                            if ("`" === r.charAt(0)) {
                                for (;
                                    "`" !== t.substr(e + i).charAt(0) && (i++, !(e + i > t.length)););
                                var u = t.substring(0, e),
                                    l = t.substring(u.length + 1, e + i),
                                    c = t.substring(e + i + 1);
                                t = u + l + c, i--
                            }
                            s.timeout = setTimeout(function() { s.toggleBlinking(!1), e >= t.length ? s.doneTyping(t, e) : s.keepTyping(t, e, i), s.temporaryPause && (s.temporaryPause = !1, s.options.onTypingResumed(s.arrayPos, s)) }, n)
                        }, n))
                    }
                }, {
                    key: "keepTyping",
                    value: function(t, e, s) {
                        0 === e && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this)), e += s;
                        var n = t.substr(0, e);
                        this.replaceText(n), this.typewrite(t, e)
                    }
                }, {
                    key: "doneTyping",
                    value: function(t, e) {
                        var s = this;
                        this.options.onStringTyped(this.arrayPos, this), this.toggleBlinking(!0), this.arrayPos === this.strings.length - 1 && (this.complete(), this.loop === !1 || this.curLoop === this.loopCount) || (this.timeout = setTimeout(function() { s.backspace(t, e) }, this.backDelay))
                    }
                }, {
                    key: "backspace",
                    value: function(t, e) {
                        var s = this;
                        if (this.pause.status === !0) return void this.setPauseStatus(t, e, !1);
                        if (this.fadeOut) return this.initFadeOut();
                        this.toggleBlinking(!1);
                        var n = this.humanizer(this.backSpeed);
                        this.timeout = setTimeout(function() {
                            e = o.htmlParser.backSpaceHtmlChars(t, e, s);
                            var n = t.substr(0, e);
                            if (s.replaceText(n), s.smartBackspace) {
                                var i = s.strings[s.arrayPos + 1];
                                i && n === i.substr(0, e) ? s.stopNum = e : s.stopNum = 0
                            }
                            e > s.stopNum ? (e--, s.backspace(t, e)) : e <= s.stopNum && (s.arrayPos++, s.arrayPos === s.strings.length ? (s.arrayPos = 0, s.options.onLastStringBackspaced(), s.shuffleStringsIfNeeded(), s.begin()) : s.typewrite(s.strings[s.sequence[s.arrayPos]], e))
                        }, n)
                    }
                }, { key: "complete", value: function() { this.options.onComplete(this), this.loop ? this.curLoop++ : this.typingComplete = !0 } }, { key: "setPauseStatus", value: function(t, e, s) { this.pause.typewrite = s, this.pause.curString = t, this.pause.curStrPos = e } }, { key: "toggleBlinking", value: function(t) { this.cursor && (this.pause.status || this.cursorBlinking !== t && (this.cursorBlinking = t, t ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink"))) } }, { key: "humanizer", value: function(t) { return Math.round(Math.random() * t / 2) + t } }, { key: "shuffleStringsIfNeeded", value: function() { this.shuffle && (this.sequence = this.sequence.sort(function() { return Math.random() - .5 })) } }, { key: "initFadeOut", value: function() { var t = this; return this.el.className += " " + this.fadeOutClass, this.cursor && (this.cursor.className += " " + this.fadeOutClass), setTimeout(function() { t.arrayPos++, t.replaceText(""), t.strings.length > t.arrayPos ? t.typewrite(t.strings[t.sequence[t.arrayPos]], 0) : (t.typewrite(t.strings[0], 0), t.arrayPos = 0) }, this.fadeOutDelay) } }, { key: "replaceText", value: function(t) { this.attr ? this.el.setAttribute(this.attr, t) : this.isInput ? this.el.value = t : "html" === this.contentType ? this.el.innerHTML = t : this.el.textContent = t } }, {
                    key: "bindFocusEvents",
                    value: function() {
                        var t = this;
                        this.isInput && (this.el.addEventListener("focus", function(e) { t.stop() }), this.el.addEventListener("blur", function(e) { t.el.value && 0 !== t.el.value.length || t.start() }))
                    }
                }, { key: "insertCursor", value: function() { this.showCursor && (this.cursor || (this.cursor = document.createElement("span"), this.cursor.className = "typed-cursor", this.cursor.setAttribute("aria-hidden", !0), this.cursor.innerHTML = this.cursorChar, this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling))) } }]), t
            }();
        e["default"] = a, t.exports = e["default"]
    }, function(t, e, s) {
        "use strict";

        function n(t) { return t && t.__esModule ? t : { "default": t } }

        function i(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(e, "__esModule", { value: !0 });
        var r = Object.assign || function(t) { for (var e = 1; e < arguments.length; e++) { var s = arguments[e]; for (var n in s) Object.prototype.hasOwnProperty.call(s, n) && (t[n] = s[n]) } return t },
            o = function() {
                function t(t, e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, s, n) { return s && t(e.prototype, s), n && t(e, n), e }
            }(),
            a = s(2),
            u = n(a),
            l = function() {
                function t() { i(this, t) }
                return o(t, [{
                    key: "load",
                    value: function(t, e, s) {
                        if ("string" == typeof s ? t.el = document.querySelector(s) : t.el = s, t.options = r({}, u["default"], e), t.isInput = "input" === t.el.tagName.toLowerCase(), t.attr = t.options.attr, t.bindInputFocusEvents = t.options.bindInputFocusEvents, t.showCursor = !t.isInput && t.options.showCursor, t.cursorChar = t.options.cursorChar, t.cursorBlinking = !0, t.elContent = t.attr ? t.el.getAttribute(t.attr) : t.el.textContent, t.contentType = t.options.contentType, t.typeSpeed = t.options.typeSpeed, t.startDelay = t.options.startDelay, t.backSpeed = t.options.backSpeed, t.smartBackspace = t.options.smartBackspace, t.backDelay = t.options.backDelay, t.fadeOut = t.options.fadeOut, t.fadeOutClass = t.options.fadeOutClass, t.fadeOutDelay = t.options.fadeOutDelay, t.isPaused = !1, t.strings = t.options.strings.map(function(t) { return t.trim() }), "string" == typeof t.options.stringsElement ? t.stringsElement = document.querySelector(t.options.stringsElement) : t.stringsElement = t.options.stringsElement, t.stringsElement) {
                            t.strings = [], t.stringsElement.style.display = "none";
                            var n = Array.prototype.slice.apply(t.stringsElement.children),
                                i = n.length;
                            if (i)
                                for (var o = 0; o < i; o += 1) {
                                    var a = n[o];
                                    t.strings.push(a.innerHTML.trim())
                                }
                        }
                        t.strPos = 0, t.arrayPos = 0, t.stopNum = 0, t.loop = t.options.loop, t.loopCount = t.options.loopCount, t.curLoop = 0, t.shuffle = t.options.shuffle, t.sequence = [], t.pause = { status: !1, typewrite: !0, curString: "", curStrPos: 0 }, t.typingComplete = !1;
                        for (var o in t.strings) t.sequence[o] = o;
                        t.currentElContent = this.getCurrentElContent(t), t.autoInsertCss = t.options.autoInsertCss, this.appendAnimationCss(t)
                    }
                }, { key: "getCurrentElContent", value: function(t) { var e = ""; return e = t.attr ? t.el.getAttribute(t.attr) : t.isInput ? t.el.value : "html" === t.contentType ? t.el.innerHTML : t.el.textContent } }, {
                    key: "appendAnimationCss",
                    value: function(t) {
                        var e = "data-typed-js-css";
                        if (t.autoInsertCss && (t.showCursor || t.fadeOut) && !document.querySelector("[" + e + "]")) {
                            var s = document.createElement("style");
                            s.type = "text/css", s.setAttribute(e, !0);
                            var n = "";
                            t.showCursor && (n += "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "), t.fadeOut && (n += "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "), 0 !== s.length && (s.innerHTML = n, document.body.appendChild(s))
                        }
                    }
                }]), t
            }();
        e["default"] = l;
        var c = new l;
        e.initializer = c
    }, function(t, e) {
        "use strict";
        Object.defineProperty(e, "__esModule", { value: !0 });
        var s = { strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"], stringsElement: null, typeSpeed: 0, startDelay: 0, backSpeed: 0, smartBackspace: !0, shuffle: !1, backDelay: 700, fadeOut: !1, fadeOutClass: "typed-fade-out", fadeOutDelay: 500, loop: !1, loopCount: 1 / 0, showCursor: !0, cursorChar: "|", autoInsertCss: !0, attr: null, bindInputFocusEvents: !1, contentType: "html", onBegin: function(t) {}, onComplete: function(t) {}, preStringTyped: function(t, e) {}, onStringTyped: function(t, e) {}, onLastStringBackspaced: function(t) {}, onTypingPaused: function(t, e) {}, onTypingResumed: function(t, e) {}, onReset: function(t) {}, onStop: function(t, e) {}, onStart: function(t, e) {}, onDestroy: function(t) {} };
        e["default"] = s, t.exports = e["default"]
    }, function(t, e) {
        "use strict";

        function s(t, e) { if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
        Object.defineProperty(e, "__esModule", { value: !0 });
        var n = function() {
                function t(t, e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                    }
                }
                return function(e, s, n) { return s && t(e.prototype, s), n && t(e, n), e }
            }(),
            i = function() {
                function t() { s(this, t) }
                return n(t, [{
                    key: "typeHtmlChars",
                    value: function(t, e, s) {
                        if ("html" !== s.contentType) return e;
                        var n = t.substr(e).charAt(0);
                        if ("<" === n || "&" === n) {
                            var i = "";
                            for (i = "<" === n ? ">" : ";"; t.substr(e + 1).charAt(0) !== i && (e++, !(e + 1 > t.length)););
                            e++
                        }
                        return e
                    }
                }, {
                    key: "backSpaceHtmlChars",
                    value: function(t, e, s) {
                        if ("html" !== s.contentType) return e;
                        var n = t.substr(e).charAt(0);
                        if (">" === n || ";" === n) {
                            var i = "";
                            for (i = ">" === n ? "<" : "&"; t.substr(e - 1).charAt(0) !== i && (e--, !(e < 0)););
                            e--
                        }
                        return e
                    }
                }]), t
            }();
        e["default"] = i;
        var r = new i;
        e.htmlParser = r
    }])
});
//# sourceMappingURL=typed.min.js.map

/*
====================================================
iconify design CODE
====================================================
*/
/**
 * (c) Vjacheslav Trushkin <cyberalien@gmail.com>
 *
 * For the full copyright and license information, please view the license.txt or license.gpl.txt
 * files at https://github.com/iconify/iconify
 *
 * Licensed under Apache 2.0 or GPL 2.0 at your option.
 * If derivative product is not compatible with one of licenses, you can pick one of licenses.
 *
 * @license Apache 2.0
 * @license GPL 2.0
 */
"use strict";
if (void 0 === self.Iconify && (self.Iconify = { isReady: !1 }, self.SimpleSVG = self.Iconify, function(e, t) {
        var i, n, o, r, s, a, c, l, u, d, f, h, p, v, g, b, m, y, w, _, x, O, A, j, I, E, k, C, M, L, S, N, P, T, F, R, D, H, V, G, Q, z, B, q, Y, J, U, W, $, K, X, Z, ee, te, ie, ne, oe, re = { config: {}, version: "1.0.7" };

        function se(e, t) { var i; return t = t || { bubbles: !1, cancelable: !1, detail: void 0 }, (i = document.createEvent("CustomEvent")).initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i }

        function ae() { document.removeEventListener("DOMContentLoaded", ae), window.removeEventListener("load", ae), o.DOMReadyCallback() }

        function ce(t, i, e) {
            var n = t;
            if ("_" !== t.slice(0, 1)) {
                if (void 0 === u[t]) {
                    if (!e || void 0 === u["_" + t]) return;
                    n = "_" + t
                }
                switch (n) {
                    case "API":
                    case "SVGAttributes":
                        Object.keys(i).forEach(function(e) { null === i[t] ? delete u[n][e] : u[n][e] = i[e] });
                        break;
                    default:
                        u[n] = i
                }
            }
        }

        function le(e, t) {
            return function(e, t) {
                switch (e) {
                    case "rotate":
                        return t = parseInt(t), isNaN(t) ? null : t;
                    case "width":
                    case "height":
                    case "inlineHeight":
                    case "inlineTop":
                    case "verticalAlign":
                        return t = parseFloat(t), isNaN(t) ? null : t;
                    case "vFlip":
                    case "hFlip":
                        return !!t;
                    case "body":
                    case "parent":
                        return "string" == typeof t ? t : null
                }
                return t
            }("rotate", e + t)
        }

        function ue(e, t) { return !!e != !!t }

        function de(e) { var i = Object.create(null); return (void 0 === e._defaults ? [e, v] : [e, e._defaults, v]).forEach(function(t) { Object.keys(t).forEach(function(e) { "object" != typeof t[e] && void 0 === i[e] && (i[e] = t[e]) }) }), void 0 === i.inlineTop && (i.inlineTop = i.top), void 0 === i.inlineHeight && (i.inlineHeight = i.height), void 0 === i.verticalAlign && (i.height % 7 == 0 && i.height % 8 != 0 ? i.verticalAlign = -.143 : i.verticalAlign = -.125), i }

        function fe() {
            return this._icons = Object.create(null), this._aliases = Object.create(null), this._resolved = Object.create(null), this._add = function(e, t, i) {
                var n = e ? "_aliases" : "_icons";
                void 0 === this._resolved[t.prefix] ? (this._resolved[t.prefix] = Object.create(null), this._icons[t.prefix] = Object.create(null), this._aliases[t.prefix] = Object.create(null)) : (delete this._icons[t.prefix][t.icon], delete this._aliases[t.prefix][t.icon]), this._resolved[t.prefix][t.icon] = !1, this[n][t.prefix][t.icon] = i
            }, this._resolveIcon = function(e) {
                var t, i, n, o, r, s;
                if (void 0 === this._resolved[e.prefix] || void 0 === this._resolved[e.prefix][e.icon]) return null;
                if (!1 !== this._resolved[e.prefix][e.icon]) return this._resolved[e.prefix][e.icon];
                if (void 0 !== this._icons[e.prefix][e.icon]) return this._resolved[e.prefix][e.icon] = de(this._icons[e.prefix][e.icon]);
                for (i = 0, t = this._aliases[e.prefix][e.icon], n = Object.create(null), Object.keys(t).forEach(function(e) { "parent" !== e && (n[e] = t[e]) }), o = t.parent;;) {
                    if (5 < ++i || void 0 === this._resolved[e.prefix][o]) return this._resolved[e.prefix][e.icon] = null;
                    if (r = void 0 === this._icons[e.prefix][o], s = this[r ? "_aliases" : "_icons"][e.prefix][o], Object.keys(s).forEach(function(e) {
                            if (void 0 !== n[e]) switch (e) {
                                case "rotate":
                                    n[e] = le(n[e], s[e]);
                                    break;
                                case "hFlip":
                                case "vFlip":
                                    n[e] = ue(n[e], s[e])
                            } else "parent" !== e && (n[e] = s[e])
                        }), !r) break;
                    o = s.parent
                }
                return this._resolved[e.prefix][e.icon] = de(n)
            }, this.addCollection = function(n) {
                var o = this,
                    r = Object.create(null);
                g.forEach(function(e) { void 0 !== n[e] ? r[e] = n[e] : void 0 !== v[e] && (r[e] = v[e]) }), void 0 !== n.icons && Object.keys(n.icons).forEach(function(e) {
                    var t = p(e, n.prefix),
                        i = n.icons[e];
                    void 0 !== i.body && (i._defaults = r, o._add(!1, t, i))
                }), void 0 !== n.aliases && Object.keys(n.aliases).forEach(function(e) {
                    var t = p(e, n.prefix),
                        i = n.aliases[e];
                    if (void 0 !== i.parent) {
                        if (void 0 === n.prefix) {
                            if (i.parent.slice(0, t.prefix.length) !== t.prefix) return;
                            i.parent = i.parent.slice(t.prefix.length + 1)
                        }
                        o._add(!0, t, i)
                    }
                })
            }, this.addIcon = function(e, t, i) {
                var n = void 0 !== t.parent,
                    o = p(e, i);
                if (n && void 0 === i) {
                    if (t.parent.slice(0, o.prefix.length) !== o.prefix) return;
                    t.parent = t.parent.slice(o.prefix.length + 1)
                }
                this._add(n, o, t)
            }, this.exists = function(e, t) { var i = p(e, t); return void 0 !== this._resolved[i.prefix] && void 0 !== this._resolved[i.prefix][i.icon] }, this.getIcon = function(e, t) { var i = p(e, t); return this._resolveIcon(i) }, this.copyIcon = function(e, t) { var i, n = this.getIcon(e, t); return null === n ? null : (i = Object.create(null), Object.keys(n).forEach(function(e) { i[e] = n[e] }), i) }, this.list = function(e) { var i, n; return void 0 !== e ? void 0 === this._resolved[e] ? [] : Object.keys(this._resolved[e]) : (i = [], n = this._resolved, Object.keys(n).forEach(function(t) { i = i.concat(Object.keys(n[t]).map(function(e) { return "" === t && -1 === e.indexOf("-") ? e : t + ":" + e })) }), i) }, this
        }

        function he() { w && (w = !1, m.scanDOM()) }

        function pe(e, t, i) {
            var n, o, r, s, a;
            if (1 === t) return e;
            if (i = void 0 === i ? 100 : i, "number" == typeof e) return Math.ceil(e * t * i) / i;
            if ("string" != typeof e) return e;
            if (null === (n = e.split(A)) || !n.length) return e;
            for (o = [], r = n.shift(), s = j.test(r);;) {
                if (s ? (a = parseFloat(r), isNaN(a) ? o.push(r) : o.push(Math.ceil(a * t * i) / i)) : o.push(r), void 0 === (r = n.shift())) return o.join("");
                s = !s
            }
        }

        function ve(e, t, i) {
            var n, o, r;
            for (n = 0; n < t.length; n++)
                if (void 0 !== e[o = t[n]]) switch (typeof(r = e[o])) {
                    case "boolean":
                        return r;
                    case "number":
                        return !!r;
                    case "string":
                        switch (r.toLowerCase()) {
                            case "1":
                            case "true":
                            case o:
                                return !0;
                            case "0":
                            case "false":
                            case "":
                                return !1
                        }
                }
            return i
        }

        function ge(e, t, i) {
            var n, o;
            for (n = 0; n < t.length; n++)
                if (void 0 !== e[o = t[n]]) return e[o];
            return i
        }

        function be() {
            var s = N.loaderMaxURLSize,
                o = Object.create(null);

            function a(e, t) { var i, n = o[e]; "function" != typeof n ? (n = n.replace("{icons}", t.join(",")), (i = document.createElement("script")).setAttribute("type", "text/javascript"), i.setAttribute("src", n), i.setAttribute("async", !0), document.head.appendChild(i)) : n.call(L, e, t) }

            function c(e) { var t = void 0 === N.API[e] ? N.defaultAPI : N.API[e]; return "function" == typeof t ? (o[e] = t, !1) : -1 === t.indexOf("{icons}") ? (o[e] = t, null) : (t = t.replace("{prefix}", e).replace("{callback}", "Iconify._loaderCallback"), (o[e] = t).replace("{icons}", "").length) }
            Object.keys(T).forEach(function(i) {
                var n = c(i),
                    o = !1 === n,
                    r = [];
                if (null === n) return a(i, []), void(F[i] = !0);
                T[i].forEach(function(e, t) { o || (n += e.length + 1, s <= n && (a(i, r), r = [], n = c(i) + e.length + 1)), r.push(e) }), r.length && a(i, r), F[i] = void 0 === F[i] ? T[i] : F[i].concat(T[i]), delete T[i]
            }), D = !1
        }

        function me(e, t, i) { return i || S.domready || N.loadBeforeDOMReady ? (void 0 === T[e] || -1 === T[e].indexOf(t)) && (void 0 === F[e] || !0 !== F[e] && -1 === F[e].indexOf(t)) && (void 0 === T[e] && (T[e] = []), T[e].push(t), D || (D = !0, window.setTimeout(be, 0)), 1) : (o = t, void 0 === R[n = e] && (R[n] = Object.create(null)), R[n][o] = !0, void 0 === S._loaderDOMReady && (S._loaderDOMReady = S.DOMReadyCallback, S.DOMReadyCallback = function() { S._loaderDOMReady(), Object.keys(R).forEach(function(t) { Object.keys(R[t]).forEach(function(e) { L.iconExists(e, t) || me(t, e, !0) }) }) }), 1); var n, o }

        function ye() { var e;!1 !== U && U.length ? (e = U, U = !1, Q.scanDOM(e)) : U = !1 }

        function we(e) {
            e.forEach(function(e) {
                var t;
                if (!1 === U && (U = [], window.setTimeout(ye, 0)), e.addedNodes)
                    for (t = 0; t < e.addedNodes.length; t++) U.push(e.addedNodes[t])
            })
        }

        function _e() { q.observe(void 0 === z._root ? document.querySelector("body") : z._root, W) }

        function xe(e, t) { var i; return "<?" === e.slice(0, 2) && (i = e.indexOf(">"), e = e.slice(i + 1)), e = -1 !== (i = (e = e.replace("viewbox=", "viewBox=").replace("preserveaspectratio=", "preserveAspectRatio=")).indexOf("</")) ? e.replace("</", t + "</") : e.replace("/>", ">" + t + "</svg>") }
        i = re, "function" != typeof window.CustomEvent && (se.prototype = window.Event.prototype, window.CustomEvent = se), i.event = function(e, t) { document.dispatchEvent(new CustomEvent(e, t)) }, n = e, r = (o = re).config, s = null, o.DOMReadyCallback = function() { o.domready = !0, o.nextInitItem() }, o.initTimeout = function(e) {
                function t() {
                    if (null !== s) {
                        if (!1 !== s.callback()) return s.stop(), void o.nextInitItem();
                        s.counter++, 10 !== s.counter && 25 !== s.counter || (window.clearInterval(s.id), s.id = window.setInterval(t, 10 === s.counter ? 250 : 1e3))
                    }
                }
                null !== s && s.stop(), s = { id: window.setInterval(t, 100), counter: 0, callback: e, stop: function() { window.clearInterval(s.id), s = null }, nextTick: t }
            }, o.domready = !1, o.ready = !1, o.initQueue = [], o.readyQueue = [], o.nextInitItem = function() {
                var e;
                if (!o.ready) {
                    if (o.initQueue.length) e = o.initQueue.shift();
                    else {
                        if (!o.domready) return void o.initTimeout(function() { return !o.domready && document.body && o.scanDOM(), o.domready });
                        if (!o.readyQueue.length) return o.ready = n.isReady = !0, o.event(r._readyEvent), void o.scanDOM();
                        e = o.readyQueue.shift()
                    }!1 !== e() && o.nextInitItem()
                }
            }, o.addStylesheet = function(e) {
                var t;
                if (!document.head || !document.body) return !!o.domready || (e || o.initTimeout(o.addStylesheet.bind(null, !0)), !1);
                try {
                    (t = document.createElement("style")).type = "text/css", t.innerHTML = "span.iconify, i.iconify, iconify-icon { display: inline-block; width: 1em; }", null !== document.head.firstChild ? document.head.insertBefore(t, document.head.firstChild) : document.head.appendChild(t)
                } catch (e) {}
                return !0
            }, o.initQueue.push(o.addStylesheet.bind(null, !1)), n.ready = function(e) { n.isReady ? window.setTimeout(e) : document.addEventListener(r._readyEvent, e) }, window.setTimeout(function() { "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? o.domready = !0 : (document.addEventListener("DOMContentLoaded", ae), window.addEventListener("load", ae)), o.nextInitItem() }), (a = re.config).SVGAttributes = Object.create(null), a._imageClass = "iconify", a._loadingClass = "svg-loading", a._iconAttribute = "data-icon", a._rotateAttribute = "data-rotate", a._flipAttribute = "data-flip", a._inlineModeAttribute = "data-inline", a._alignAttribute = "data-align", a._appendAttribute = "data-icon-append", a._appendedClass = "svg-appended", a._readyEvent = "IconifyReady", a._webComponentsPolyfill = "https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js", a._classListPolyfill = "https://cdnjs.cloudflare.com/ajax/libs/classlist/1.1.20150312/classList.min.js",
            function(t) { t.defaultAPI = "https://api.iconify.design/{prefix}.js?icons={icons}", t.API = Object.create(null), t.loaderMaxURLSize = 500, t.loadBeforeDOMReady = !(document && document.body), t._loaderEvent = "IconifyAddedIcons", t.sessionStorage = !0; try { t.localStorage = !!(window && window.localStorage && window.localStorage.length) } catch (e) { t.localStorage = !1 } }(re.config), c = e, l = t, u = re.config, c.setConfig = function(e, t) { ce(e, t, !1) }, c.setCustomAPI = function(e, t) {
                switch (typeof e) {
                    case "string":
                        0;
                        break;
                    case "object":
                        if (e instanceof Array) { 0; break }
                    default:
                        return
                }
                e.forEach(function(e) { null === t ? delete u.API[e] : u.API[e] = t })
            }, c.getConfig = function(e) { return void 0 === u[e] ? void 0 === u["_" + e] ? null : u["_" + e] : u[e] }, ["SimpleSVG", "Iconify"].forEach(function(e) {
                var t;
                void 0 !== l[e + "Config"] && "object" == typeof l[e + "Config"] && (t = l[e + "Config"], Object.keys(t).forEach(function(e) { ce(e, t[e], !0) }))
            }), f = (d = re).config, h = t, d.initQueue.push(function() {
                var e = { observer: !1, classList: !1 },
                    t = { observer: !1, classList: !1 };

                function i(e) { var t; return !e.length || (document.head ? ((t = document.createElement("script")).setAttribute("src", e), t.setAttribute("type", "text/javascript"), document.head.appendChild(t), !0) : d.domready) }

                function n() {
                    if ("classList" in document.createElement("div")) return 1;
                    t.classList || (t.classList = i(f._classListPolyfill))
                }

                function o() { return h.MutationObserver && h.WeakMap || t.observer || (t.observer = i(f._webComponentsPolyfill)), 1 }
                return e.classList = !n(), e.observer = !o(), !e.classList && !e.observer || (d.initTimeout(function() { return !(e.observer && !o() || e.classList && !n()) }), !1)
            }), re.getPrefix = function(e, t) { var i; return "string" == typeof t && "" !== t ? { prefix: t, icon: e } : 2 === (i = e.split(":")).length ? { prefix: i[0], icon: i[1] } : 1 < (i = e.split("-")).length ? { prefix: t = i.shift(), icon: i.join("-") } : { prefix: "", icon: e } }, p = re.getPrefix, v = { left: 0, top: 0, width: 16, height: 16, rotate: 0, vFlip: !1, hFlip: !1 }, g = ["left", "top", "width", "height", "body", "rotate", "vFlip", "hFlip", "inlineTop", "inlineHeight", "verticalAlign"], fe.mergeFlip = ue, fe.mergeRotation = le, fe.blankIcon = function() { return de({ body: "", width: 16, height: 16 }) }, re.Storage = fe, b = e, y = t, w = !1, _ = new(m = re).Storage, b.addCollection = function(e, t) { _.addCollection(e), w || !0 === t || (w = !0, window.setTimeout(he, 0)) }, b.addIcon = function(e, t, i) { _.addIcon(e, t), w || !0 === i || (w = !0, window.setTimeout(he, 0)) }, b.iconExists = _.exists.bind(_), b.getIcon = _.copyIcon.bind(_), b.listIcons = _.list.bind(_), ["SimpleSVG", "Iconify"].forEach(function(e) { void 0 !== y[e + "Preload"] && y[e + "Preload"] instanceof Array && y[e + "Preload"].forEach(function(e) { "object" == typeof e && void 0 !== e.icons && b.addCollection(e) }) }), x = re.Storage, O = re.config, A = /(-?[0-9.]*[0-9]+[0-9.]*)/g, j = /^-?[0-9.]*[0-9]+[0-9.]*$/g, I = ["width", "height", "inline"], E = ["title"], k = 0, re.SVG = function(_) {
                return _ = _ || x.blankIcon(), this.item = _, this.height = function(e, t, i) { return void 0 === e ? t ? this.item.inlineHeight : this.item.height : pe(e, (t ? this.item.inlineHeight : this.item.height) / this.item.width, i) }, this.width = function(e, t, i) { return void 0 === e ? this.item.width : pe(e, this.item.width / (t ? this.item.inlineHeight : this.item.height), i) }, this.defaultAttributes = function() { return { xmlns: "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink", "aria-hidden": "true", focusable: "false" } }, this.preserveAspectRatio = function(e, t, i) {
                    var n = "";
                    switch (e) {
                        case "left":
                            n += "xMin";
                            break;
                        case "right":
                            n += "xMax";
                            break;
                        default:
                            n += "xMid"
                    }
                    switch (t) {
                        case "top":
                            n += "YMin";
                            break;
                        case "bottom":
                            n += "YMax";
                            break;
                        default:
                            n += "YMid"
                    }
                    return n += !0 === i ? " slice" : " meet"
                }, this.htmlspecialchars = function(e) {
                    switch (typeof e) {
                        case "boolean":
                        case "number":
                            return e + "";
                        case "string":
                            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")
                    }
                    return ""
                }, this.attributes = function(t) {
                    var e, i, n, o, r, s, a, c, l, u, d, f, h, p, v = this,
                        g = { horizontal: "center", vertical: "middle", crop: !1 },
                        b = { rotate: _.rotate, hFlip: _.hFlip, vFlip: _.vFlip },
                        m = "",
                        y = this.defaultAttributes(),
                        w = [];
                    if (s = ve(t = "object" == typeof t ? t : Object.create(null), [O._inlineModeAttribute, "inline"], !0), u = ve(t, [O._appendAttribute], !1), e = { left: _.left, top: s ? _.inlineTop : _.top, width: _.width, height: s ? _.inlineHeight : _.height }, "string" == typeof t[O._flipAttribute] && t[O._flipAttribute].split(/[\s,]+/).forEach(function(e) {
                            switch (e = e.toLowerCase()) {
                                case "horizontal":
                                    b.hFlip = !b.hFlip;
                                    break;
                                case "vertical":
                                    b.vFlip = !b.vFlip
                            }
                        }), void 0 !== t[O._rotateAttribute])
                        if ("number" == typeof(c = t[O._rotateAttribute])) b.rotate += c;
                        else if ("string" == typeof c)
                        if ("" === (d = c.replace(/^-?[0-9.]*/, ""))) c = parseInt(c), isNaN(c) || (b.rotate += c);
                        else if (d !== c) {
                        switch (l = !1, d) {
                            case "%":
                                l = 25;
                                break;
                            case "deg":
                                l = 90
                        }
                        l && (c = parseInt(c.slice(0, c.length - d.length)), isNaN(c) || (b.rotate += Math.round(c / l)))
                    }
                    switch (b.hFlip ? b.vFlip ? b.rotate += 2 : (w.push("translate(" + (e.width + e.left) + " " + (0 - e.top) + ")"), w.push("scale(-1 1)"), e.top = e.left = 0) : b.vFlip && (w.push("translate(" + (0 - e.left) + " " + (e.height + e.top) + ")"), w.push("scale(1 -1)"), e.top = e.left = 0), b.rotate % 4) {
                        case 1:
                            p = e.height / 2 + e.top, w.unshift("rotate(90 " + p + " " + p + ")"), 0 === e.left && 0 === e.top || (p = e.left, e.left = e.top, e.top = p), e.width !== e.height && (p = e.width, e.width = e.height, e.height = p);
                            break;
                        case 2:
                            w.unshift("rotate(180 " + (e.width / 2 + e.left) + " " + (e.height / 2 + e.top) + ")");
                            break;
                        case 3:
                            p = e.width / 2 + e.left, w.unshift("rotate(-90 " + p + " " + p + ")"), 0 === e.left && 0 === e.top || (p = e.left, e.left = e.top, e.top = p), e.width !== e.height && (p = e.width, e.width = e.height, e.height = p)
                    }
                    return i = ge(t, ["data-width", "width"], null), n = ge(t, ["data-height", "height"], null), null === i && null === n && (n = "1em"), null !== i && null !== n ? (o = i, r = n) : null !== i ? r = pe(o = i, e.height / e.width) : o = pe(r = n, e.width / e.height), !1 !== o && (y.width = "auto" === o ? e.width : o), !1 !== r && (y.height = "auto" === r ? e.height : r), s && 0 !== _.verticalAlign ? m += "vertical-align: " + (h = _.verticalAlign + "em") + ";" : h = "", "string" == typeof t[O._alignAttribute] && t[O._alignAttribute].toLowerCase().split(/[\s,]+/).forEach(function(e) {
                        switch (e) {
                            case "left":
                            case "right":
                            case "center":
                                g.horizontal = e;
                                break;
                            case "top":
                            case "bottom":
                            case "middle":
                                g.vertical = e;
                                break;
                            case "crop":
                                g.crop = !0;
                                break;
                            case "meet":
                                g.crop = !1
                        }
                    }), m += "-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);", y.style = m + (void 0 === t.style ? "" : t.style), y.preserveAspectRatio = this.preserveAspectRatio(g.horizontal, g.vertical, g.crop), y.viewBox = e.left + " " + e.top + " " + e.width + " " + e.height, a = function(i) {
                        var e, n, t = /\sid="(\S+)"/g,
                            o = [];

                        function r(e, t, i) { for (var n = 0; - 1 !== (n = i.indexOf(e, n));) i = i.slice(0, n) + t + i.slice(n + e.length), n += t.length; return i }
                        for (; e = t.exec(i);) o.push(e[1]);
                        return o.length && (n = "IconifyId-" + Date.now().toString(16) + "-" + (16777216 * Math.random() | 0).toString(16) + "-", o.forEach(function(e) {
                            var t = n + k;
                            k++, i = r('="' + e + '"', '="' + t + '"', i), i = r('="#' + e + '"', '="#' + t + '"', i), i = r("(#" + e + ")", "(#" + t + ")", i)
                        })), i
                    }(this.item.body), w.length && (a = '<g transform="' + w.join(" ") + '">' + a + "</g>"), f = Object.create(null), Object.keys(t).forEach(function(e) { void 0 === y[e] && (-1 !== E.indexOf(e) ? a = "<" + e + ">" + v.htmlspecialchars(t[e]) + "</" + e + ">" + a : -1 === I.indexOf(e) && (f[e] = t[e])) }), { attributes: y, elementAttributes: f, body: a, append: u, verticalAlign: h }
                }, this
            }, M = (C = re).config._loadingClass, C.newImage = function(e, t, i) { return { element: e, icon: t, parser: i, loading: e.classList.contains(M) } }, C.parsedImage = function(e, t) { return { element: e, icon: t } }, C.getImageAttributes = function(t) { var e, i, n = Object.create(null); if (!t.element.hasAttributes()) return n; for (e = 0; e < t.element.attributes.length; e++) i = t.element.attributes[e], n[i.name] = i.value; return t.parser && void 0 !== t.parser.filterAttributes && (n = t.parser.filterAttributes(t, n)), void 0 !== n.class && (n.class = n.class.split(" ").filter(function(e) { return e !== M }), t.parser && void 0 !== t.parser.filterClasses && (n.class = t.parser.filterClasses(t, n.class)), n.class = n.class.join(" ")), void 0 !== t.attributes && Object.keys(t.attributes).forEach(function(e) { n[e] = t.attributes[e] }), n },
            function(n, f, e) {
                var s = e._imageClass,
                    t = e._loadingClass,
                    i = e._appendedClass,
                    a = e._iconAttribute,
                    o = e._inlineModeAttribute,
                    r = ":not(svg):not(." + i + ")",
                    c = ":not(." + t + ")",
                    l = "." + t,
                    h = {
                        iconify: {
                            selector: "." + s,
                            selectorAll: "." + s + r,
                            selectorNew: "." + s + r + c,
                            selectorLoading: "." + s + r + l,
                            icon: function(e) {
                                var t, i = e.getAttribute(a);
                                if ("string" == typeof i) return i;
                                for (var n = 0; n < e.classList.length; n++)
                                    if (5 < (t = e.classList[n]).length && "icon:" === t.slice(0, 5)) return t.slice(5);
                                return ""
                            },
                            filterClasses: function(e, t) { var i, n, o; for (n = 0; n < t.length; n++) "icon-" === (i = t[n]).slice(0, 5) && 2 === (i = i.slice(5).split(":")).length && (o = "data-" + i[0], void 0 === e.attributes && (e.attributes = Object.create(null)), e.attributes[o] = i[1]); return t }
                        }
                    },
                    p = Object.keys(h);
                n.addFinder = function(e, t) { void 0 === t.selectorAll && (t.selectorAll = t.selector + r), void 0 === t.selectorNew && (t.selectorNew = t.selector + r + c), void 0 === t.selectorLoading && (t.selectorLoading = t.selector + r + l), h[e] = t, p = Object.keys(h), n.isReady && n.scanDOM() }, n.addTag = function(e, i, t) { n.addFinder("tag-" + e, { selector: e, icon: null == t ? h.iconify.icon : t, filterAttributes: function(e, t) { return void 0 === t[o] && (t[o] = i), t }, filterClasses: h.iconify.filterClasses }) };
                try { "object" == typeof Reflect && "object" == typeof customElements && Object.setPrototypeOf && (Object.setPrototypeOf(u.prototype, HTMLElement.prototype), Object.setPrototypeOf(u, HTMLElement), customElements.define("iconify-icon", u)) } catch (e) {}

                function u() { return Reflect.construct(HTMLElement, [], u) }
                n.addTag("iconify-icon", !1), f.findNewImages = function(c, l) {
                    var u = [],
                        d = [];
                    return (c = void 0 === c ? void 0 === e._root ? document.body : e._root : c) && p.forEach(function(e) {
                        var t, i, n, o, r = h[e],
                            s = !0 === l ? r.selectorLoading : !1 === l ? r.selectorNew : r.selectorAll,
                            a = c.querySelectorAll(s);
                        for (t = 0; t < a.length; t++) i = a[t], (n = r.icon(i)) && -1 === d.indexOf(i) && (d.push(i), o = f.newImage(i, n, r), u.push(o))
                    }), u
                }, f.findParsedImages = function(e) {
                    var t, i, n, o = [],
                        r = e.querySelectorAll("svg." + s);
                    for (t = 0; t < r.length; t++)(n = (i = r[t]).getAttribute(a)) && o.push(f.parsedImage(i, n));
                    return o
                }
            }(e, re, re.config), L = e, N = (S = re).config, P = t, T = Object.create(null), F = Object.create(null), R = Object.create(null), H = { session: !(D = !1), local: !0 }, V = { session: 0, local: 0 }, L._loaderCallback = function(i) { var n = !1; "object" == typeof i && (["local", "session"].forEach(function(t) { var e; if (!n && H[t] && N[t + "Storage"]) { e = P[t + "Storage"]; try { V[t] || e.setItem("iconify-version", S.version), e.setItem("iconify" + V[t], JSON.stringify(i)), n = !0, V[t]++, e.setItem("iconify-count", V[t]) } catch (e) { H[t] = !1 } } }), L.addCollection(i), S.event(N._loaderEvent)) }, S.loadImage = function(e, t) { var i = S.getPrefix(e.icon); return !!L.iconExists(i.icon, i.prefix) || (!1 !== t && me(i.prefix, i.icon, !1) && e.element.classList.add(N._loadingClass), !1) }, L.preloadImages = function(e) { var t, i = !1; return e.forEach(function(e) { t = S.getPrefix(e), L.iconExists(t.icon, t.prefix) || (me(t.prefix, t.icon, !0), i = !0) }), i }, ["local", "session"].forEach(function(t) { var e, i, n; try { if ("object" != typeof(e = P[t + "Storage"])) return void(H[t] = !1); if (e.getItem("iconify-version") !== S.version) return; if ("number" != typeof(n = parseInt(e.getItem("iconify-count"))) || isNaN(n)) return; for (;;) { if (V[t] >= n) return; if ("string" != typeof(i = e.getItem("iconify" + V[t]))) return; "object" == typeof(i = JSON.parse(i)) && L.addCollection(i), V[t]++ } } catch (e) { H[t] = !1 } }), G = e, z = (Q = re).config, B = t, Y = 0, W = { childList: !(U = !1), subtree: !(J = q = null) }, G.pauseObserving = function() { null !== q && (Y || (J = q.takeRecords(), q.disconnect())), Y++ }, G.resumeObserving = function() { null !== q ? Y && (--Y || (_e(), null !== J && J.length && we(J))) : Y-- }, G.isObserverPaused = function() { return null === q || !!Y }, Q.readyQueue.push(function() { return q = new B.MutationObserver(we), Y || _e(), !0 }), $ = e, X = (K = re).config, Z = X._iconAttribute, ee = X._loadingClass, te = X._imageClass, ie = X._appendedClass, K.renderSVG = function(t) {
                var e, i, n, o, r, s, a, c, l, u, d, f = K.getImageAttributes(t),
                    h = $.getIcon(t.icon);
                for (f[Z] = t.icon, e = new K.SVG(h), n = document.createElement("svg"), r = e.attributes(f), Object.keys(r.attributes).forEach(function(e) { if (d = r.attributes[e], "style" !== e || "string" == typeof(d = t.element.getAttribute("style")) && d.length) try { n.setAttribute(e, d) } catch (e) {} }), Object.keys(r.elementAttributes).forEach(function(e) {
                        try {
                            (r.append ? t.element : n).setAttribute(e, r.elementAttributes[e])
                        } catch (e) {}
                    }), t.loading && (n.classList.remove(ee), r.append && t.element.classList.remove(ee)), n.classList.add(te), s = xe(n.outerHTML, r.body), (o = document.createElement("span")).innerHTML = s, i = o.childNodes[0], r.append ? (t.element.classList.add(ie), t.element.appendChild(i)) : (t.element.parentNode.replaceChild(i, t.element), t.element = i), a = i.style, c = t.element.style, r.verticalAlign && (a.verticalAlign = r.verticalAlign), a.transform = "rotate(360deg)", l = 0; l < c.length; l++) a[u = c[l]] = c[u];
                delete t.parser, delete t.loading
            }, $.getSVGObject = function(e, t) { return !!$.iconExists(e) && new K.SVG($.getIcon(e)).attributes(t, !1) }, $.getSVG = function(e, t) { var i, n; return !1 !== (n = $.getSVGObject(e, t)) && (i = document.createElement("svg"), Object.keys(n.attributes).forEach(function(e) { try { i.setAttribute(e, n.attributes[e]) } catch (e) {} }), xe(i.outerHTML, n.body)) }, ne = e, (oe = re).scanDOM = function() {
                var t = !1;

                function e() { oe.findNewImages().forEach(function(e) { oe.loadImage(e) && (t || (t = !0, ne.pauseObserving()), oe.renderSVG(e)) }) }
                if (oe.ready) e();
                else try { e() } catch (e) {}
                t && ne.resumeObserving()
            }, ne.scanDOM = oe.scanDOM, ne.getVersion = function() { return oe.version }
    }(self.Iconify, self)), "object" == typeof exports) try { exports.__esModule = !0, exports.default = self.Iconify } catch (e) {}


/*
====================================================
bx SLIDER CODE
====================================================
*/

/**
 * bxSlider v4.2.1d
 * Copyright 2013-2017 Steven Wanderski
 * Written while drinking Belgian ales and listening to jazz
 * Licensed under MIT (http://opensource.org/licenses/MIT)
 */
! function(t) {
    var e = { mode: "horizontal", slideSelector: "", infiniteLoop: !0, hideControlOnEnd: !1, speed: 500, easing: null, slideMargin: 0, startSlide: 0, randomStart: !1, captions: !1, ticker: !1, tickerHover: !1, adaptiveHeight: !1, adaptiveHeightSpeed: 500, video: !1, useCSS: !0, preloadImages: "visible", responsive: !0, slideZIndex: 50, wrapperClass: "bx-wrapper", touchEnabled: !0, swipeThreshold: 50, oneToOneTouch: !0, preventDefaultSwipeX: !0, preventDefaultSwipeY: !1, ariaLive: !0, ariaHidden: !0, keyboardEnabled: !1, pager: !0, pagerType: "full", pagerShortSeparator: " / ", pagerSelector: null, buildPager: null, pagerCustom: null, controls: !0, nextText: "Next", prevText: "Prev", nextSelector: null, prevSelector: null, autoControls: !1, startText: "Start", stopText: "Stop", autoControlsCombine: !1, autoControlsSelector: null, auto: !1, pause: 4e3, autoStart: !0, autoDirection: "next", stopAutoOnClick: !1, autoHover: !1, autoDelay: 0, autoSlideForOnePage: !1, minSlides: 1, maxSlides: 1, moveSlides: 0, slideWidth: 0, shrinkItems: !1, onSliderLoad: function() { return !0 }, onSlideBefore: function() { return !0 }, onSlideAfter: function() { return !0 }, onSlideNext: function() { return !0 }, onSlidePrev: function() { return !0 }, onSliderResize: function() { return !0 }, onAutoChange: function() { return !0 } };
    t.fn.bxSlider = function(n) {
        if (0 === this.length) return this;
        if (this.length > 1) return this.each(function() { t(this).bxSlider(n) }), this;
        var s = {},
            o = this,
            r = t(window).width(),
            a = t(window).height();
        if (!t(o).data("bxSlider")) {
            var l = function() {
                    t(o).data("bxSlider") || (s.settings = t.extend({}, e, n), s.settings.slideWidth = parseInt(s.settings.slideWidth), s.children = o.children(s.settings.slideSelector), s.children.length < s.settings.minSlides && (s.settings.minSlides = s.children.length), s.children.length < s.settings.maxSlides && (s.settings.maxSlides = s.children.length), s.settings.randomStart && (s.settings.startSlide = Math.floor(Math.random() * s.children.length)), s.active = { index: s.settings.startSlide }, s.carousel = s.settings.minSlides > 1 || s.settings.maxSlides > 1, s.carousel && (s.settings.preloadImages = "all"), s.minThreshold = s.settings.minSlides * s.settings.slideWidth + (s.settings.minSlides - 1) * s.settings.slideMargin, s.maxThreshold = s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin, s.working = !1, s.controls = {}, s.interval = null, s.animProp = "vertical" === s.settings.mode ? "top" : "left", s.usingCSS = s.settings.useCSS && "fade" !== s.settings.mode && function() {
                        for (var t = document.createElement("div"), e = ["WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"], i = 0; i < e.length; i++)
                            if (void 0 !== t.style[e[i]]) return s.cssPrefix = e[i].replace("Perspective", "").toLowerCase(), s.animProp = "-" + s.cssPrefix + "-transform", !0;
                        return !1
                    }(), "vertical" === s.settings.mode && (s.settings.maxSlides = s.settings.minSlides), o.data("origStyle", o.attr("style")), o.children(s.settings.slideSelector).each(function() { t(this).data("origStyle", t(this).attr("style")) }), d())
                },
                d = function() {
                    var e = s.children.eq(s.settings.startSlide);
                    o.wrap('<div class="' + s.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'), s.viewport = o.parent(), s.settings.ariaLive && !s.settings.ticker && s.viewport.attr("aria-live", "polite"), s.loader = t('<div class="bx-loading" />'), s.viewport.prepend(s.loader), o.css({ width: "horizontal" === s.settings.mode ? 1e3 * s.children.length + 215 + "%" : "auto", position: "relative" }), s.usingCSS && s.settings.easing ? o.css("-" + s.cssPrefix + "-transition-timing-function", s.settings.easing) : s.settings.easing || (s.settings.easing = "swing"), s.viewport.css({ width: "100%", overflow: "hidden", position: "relative" }), s.viewport.parent().css({ maxWidth: u() }), s.children.css({ float: "horizontal" === s.settings.mode ? "left" : "none", listStyle: "none", position: "relative" }), s.children.css("width", h()), "horizontal" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginRight", s.settings.slideMargin), "vertical" === s.settings.mode && s.settings.slideMargin > 0 && s.children.css("marginBottom", s.settings.slideMargin), "fade" === s.settings.mode && (s.children.css({ position: "absolute", zIndex: 0, display: "none" }), s.children.eq(s.settings.startSlide).css({ zIndex: s.settings.slideZIndex, display: "block" })), s.controls.el = t('<div class="bx-controls" />'), s.settings.captions && k(), s.active.last = s.settings.startSlide === f() - 1, s.settings.video && o.fitVids(), "none" === s.settings.preloadImages ? e = null : ("all" === s.settings.preloadImages || s.settings.ticker) && (e = s.children), s.settings.ticker ? s.settings.pager = !1 : (s.settings.controls && C(), s.settings.auto && s.settings.autoControls && T(), s.settings.pager && b(), (s.settings.controls || s.settings.autoControls || s.settings.pager) && s.viewport.after(s.controls.el)), null === e ? g() : c(e, g)
                },
                c = function(e, i) {
                    var n = e.find('img:not([src=""]), iframe').length,
                        s = 0;
                    if (0 === n) return void i();
                    e.find('img:not([src=""]), iframe').each(function() {
                        t(this).one("load error", function() {++s === n && i() }).each(function() {
                            (this.complete || "" == this.src) && t(this).trigger("load")
                        })
                    })
                },
                g = function() {
                    if (s.settings.infiniteLoop && "fade" !== s.settings.mode && !s.settings.ticker) {
                        var e = "vertical" === s.settings.mode ? s.settings.minSlides : s.settings.maxSlides,
                            i = s.children.slice(0, e).clone(!0).addClass("bx-clone"),
                            n = s.children.slice(-e).clone(!0).addClass("bx-clone");
                        s.settings.ariaHidden && (i.attr("aria-hidden", !0), n.attr("aria-hidden", !0)), o.append(i).prepend(n)
                    }
                    s.loader.remove(), m(), "vertical" === s.settings.mode && (s.settings.adaptiveHeight = !0), s.viewport.height(p()), o.redrawSlider(), s.settings.onSliderLoad.call(o, s.active.index), s.initialized = !0, s.settings.responsive && t(window).on("resize", U), s.settings.auto && s.settings.autoStart && (f() > 1 || s.settings.autoSlideForOnePage) && L(), s.settings.ticker && O(), s.settings.pager && z(s.settings.startSlide), s.settings.controls && q(), s.settings.touchEnabled && !s.settings.ticker && X(), s.settings.keyboardEnabled && !s.settings.ticker && t(document).keydown(B)
                },
                p = function() {
                    var e = 0,
                        n = t();
                    if ("vertical" === s.settings.mode || s.settings.adaptiveHeight)
                        if (s.carousel) { var o = 1 === s.settings.moveSlides ? s.active.index : s.active.index * x(); for (n = s.children.eq(o), i = 1; i <= s.settings.maxSlides - 1; i++) n = o + i >= s.children.length ? n.add(s.children.eq(i - 1)) : n.add(s.children.eq(o + i)) } else n = s.children.eq(s.active.index);
                    else n = s.children;
                    return "vertical" === s.settings.mode ? (n.each(function(i) { e += t(this).outerHeight() }), s.settings.slideMargin > 0 && (e += s.settings.slideMargin * (s.settings.minSlides - 1))) : e = Math.max.apply(Math, n.map(function() { return t(this).outerHeight(!1) }).get()), "border-box" === s.viewport.css("box-sizing") ? e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom")) + parseFloat(s.viewport.css("border-top-width")) + parseFloat(s.viewport.css("border-bottom-width")) : "padding-box" === s.viewport.css("box-sizing") && (e += parseFloat(s.viewport.css("padding-top")) + parseFloat(s.viewport.css("padding-bottom"))), e
                },
                u = function() { var t = "100%"; return s.settings.slideWidth > 0 && (t = "horizontal" === s.settings.mode ? s.settings.maxSlides * s.settings.slideWidth + (s.settings.maxSlides - 1) * s.settings.slideMargin : s.settings.slideWidth), t },
                h = function() {
                    var t = s.settings.slideWidth,
                        e = s.viewport.width();
                    if (0 === s.settings.slideWidth || s.settings.slideWidth > e && !s.carousel || "vertical" === s.settings.mode) t = e;
                    else if (s.settings.maxSlides > 1 && "horizontal" === s.settings.mode) {
                        if (e > s.maxThreshold) return t;
                        e < s.minThreshold ? t = (e - s.settings.slideMargin * (s.settings.minSlides - 1)) / s.settings.minSlides : s.settings.shrinkItems && (t = Math.floor((e + s.settings.slideMargin) / Math.ceil((e + s.settings.slideMargin) / (t + s.settings.slideMargin)) - s.settings.slideMargin))
                    }
                    return t
                },
                v = function() {
                    var t = 1,
                        e = null;
                    return "horizontal" === s.settings.mode && s.settings.slideWidth > 0 ? s.viewport.width() < s.minThreshold ? t = s.settings.minSlides : s.viewport.width() > s.maxThreshold ? t = s.settings.maxSlides : (e = s.children.first().width() + s.settings.slideMargin, t = Math.floor((s.viewport.width() + s.settings.slideMargin) / e) || 1) : "vertical" === s.settings.mode && (t = s.settings.minSlides), t
                },
                f = function() {
                    var t = 0,
                        e = 0,
                        i = 0;
                    if (s.settings.moveSlides > 0) {
                        if (!s.settings.infiniteLoop) { for (; e < s.children.length;) ++t, e = i + v(), i += s.settings.moveSlides <= v() ? s.settings.moveSlides : v(); return i }
                        t = Math.ceil(s.children.length / x())
                    } else t = Math.ceil(s.children.length / v());
                    return t
                },
                x = function() { return s.settings.moveSlides > 0 && s.settings.moveSlides <= v() ? s.settings.moveSlides : v() },
                m = function() {
                    var t, e, i;
                    s.children.length > s.settings.maxSlides && s.active.last && !s.settings.infiniteLoop ? "horizontal" === s.settings.mode ? (e = s.children.last(), t = e.position(), S(-(t.left - (s.viewport.width() - e.outerWidth())), "reset", 0)) : "vertical" === s.settings.mode && (i = s.children.length - s.settings.minSlides, t = s.children.eq(i).position(), S(-t.top, "reset", 0)) : (t = s.children.eq(s.active.index * x()).position(), s.active.index === f() - 1 && (s.active.last = !0), void 0 !== t && ("horizontal" === s.settings.mode ? S(-t.left, "reset", 0) : "vertical" === s.settings.mode && S(-t.top, "reset", 0)))
                },
                S = function(e, i, n, r) {
                    var a, l;
                    s.usingCSS ? (l = "vertical" === s.settings.mode ? "translate3d(0, " + e + "px, 0)" : "translate3d(" + e + "px, 0, 0)", o.css("-" + s.cssPrefix + "-transition-duration", n / 1e3 + "s"), "slide" === i ? (o.css(s.animProp, l), 0 !== n ? o.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) { t(e.target).is(o) && (o.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), A()) }) : A()) : "reset" === i ? o.css(s.animProp, l) : "ticker" === i && (o.css("-" + s.cssPrefix + "-transition-timing-function", "linear"), o.css(s.animProp, l), 0 !== n ? o.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) { t(e.target).is(o) && (o.off("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd"), S(r.resetValue, "reset", 0), F()) }) : (S(r.resetValue, "reset", 0), F()))) : (a = {}, a[s.animProp] = e, "slide" === i ? o.animate(a, n, s.settings.easing, function() { A() }) : "reset" === i ? o.css(s.animProp, e) : "ticker" === i && o.animate(a, n, "linear", function() { S(r.resetValue, "reset", 0), F() }))
                },
                w = function() {
                    for (var e = "", i = "", n = f(), o = 0; o < n; o++) i = "", s.settings.buildPager && t.isFunction(s.settings.buildPager) || s.settings.pagerCustom ? (i = s.settings.buildPager(o), s.pagerEl.addClass("bx-custom-pager")) : (i = o + 1, s.pagerEl.addClass("bx-default-pager")), e += '<div class="bx-pager-item"><a href="" data-slide-index="' + o + '" class="bx-pager-link">' + i + "</a></div>";
                    s.pagerEl.html(e)
                },
                b = function() { s.settings.pagerCustom ? s.pagerEl = t(s.settings.pagerCustom) : (s.pagerEl = t('<div class="bx-pager" />'), s.settings.pagerSelector ? t(s.settings.pagerSelector).html(s.pagerEl) : s.controls.el.addClass("bx-has-pager").append(s.pagerEl), w()), s.pagerEl.on("click touchend", "a", I) },
                C = function() { s.controls.next = t('<a class="bx-next" href="">' + s.settings.nextText + "</a>"), s.controls.prev = t('<a class="bx-prev" href="">' + s.settings.prevText + "</a>"), s.controls.next.on("click touchend", P), s.controls.prev.on("click touchend", E), s.settings.nextSelector && t(s.settings.nextSelector).append(s.controls.next), s.settings.prevSelector && t(s.settings.prevSelector).append(s.controls.prev), s.settings.nextSelector || s.settings.prevSelector || (s.controls.directionEl = t('<div class="bx-controls-direction" />'), s.controls.directionEl.append(s.controls.prev).append(s.controls.next), s.controls.el.addClass("bx-has-controls-direction").append(s.controls.directionEl)) },
                T = function() { s.controls.start = t('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + s.settings.startText + "</a></div>"), s.controls.stop = t('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + s.settings.stopText + "</a></div>"), s.controls.autoEl = t('<div class="bx-controls-auto" />'), s.controls.autoEl.on("click", ".bx-start", M), s.controls.autoEl.on("click", ".bx-stop", y), s.settings.autoControlsCombine ? s.controls.autoEl.append(s.controls.start) : s.controls.autoEl.append(s.controls.start).append(s.controls.stop), s.settings.autoControlsSelector ? t(s.settings.autoControlsSelector).html(s.controls.autoEl) : s.controls.el.addClass("bx-has-controls-auto").append(s.controls.autoEl), D(s.settings.autoStart ? "stop" : "start") },
                k = function() {
                    s.children.each(function(e) {
                        var i = t(this).find("img:first").attr("title");
                        void 0 !== i && ("" + i).length && t(this).append('<div class="bx-caption"><span>' + i + "</span></div>")
                    })
                },
                P = function(t) { t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), o.goToNextSlide()) },
                E = function(t) { t.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), o.goToPrevSlide()) },
                M = function(t) { o.startAuto(), t.preventDefault() },
                y = function(t) { o.stopAuto(), t.preventDefault() },
                I = function(e) {
                    var i, n;
                    e.preventDefault(), s.controls.el.hasClass("disabled") || (s.settings.auto && s.settings.stopAutoOnClick && o.stopAuto(), i = t(e.currentTarget), void 0 !== i.attr("data-slide-index") && (n = parseInt(i.attr("data-slide-index"))) !== s.active.index && o.goToSlide(n))
                },
                z = function(e) {
                    var i = s.children.length;
                    if ("short" === s.settings.pagerType) return s.settings.maxSlides > 1 && (i = Math.ceil(s.children.length / s.settings.maxSlides)), void s.pagerEl.html(e + 1 + s.settings.pagerShortSeparator + i);
                    s.pagerEl.find("a").removeClass("active"), s.pagerEl.each(function(i, n) { t(n).find("a").eq(e).addClass("active") })
                },
                A = function() {
                    if (s.settings.infiniteLoop) {
                        var t = "";
                        0 === s.active.index ? t = s.children.eq(0).position() : s.active.index === f() - 1 && s.carousel ? t = s.children.eq((f() - 1) * x()).position() : s.active.index === s.children.length - 1 && (t = s.children.eq(s.children.length - 1).position()), t && ("horizontal" === s.settings.mode ? S(-t.left, "reset", 0) : "vertical" === s.settings.mode && S(-t.top, "reset", 0))
                    }
                    s.working = !1, s.settings.onSlideAfter.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index)
                },
                D = function(t) { s.settings.autoControlsCombine ? s.controls.autoEl.html(s.controls[t]) : (s.controls.autoEl.find("a").removeClass("active"), s.controls.autoEl.find("a:not(.bx-" + t + ")").addClass("active")) },
                q = function() { 1 === f() ? (s.controls.prev.addClass("disabled"), s.controls.next.addClass("disabled")) : !s.settings.infiniteLoop && s.settings.hideControlOnEnd && (0 === s.active.index ? (s.controls.prev.addClass("disabled"), s.controls.next.removeClass("disabled")) : s.active.index === f() - 1 ? (s.controls.next.addClass("disabled"), s.controls.prev.removeClass("disabled")) : (s.controls.prev.removeClass("disabled"), s.controls.next.removeClass("disabled"))) },
                H = function() { o.startAuto() },
                W = function() { o.stopAuto() },
                L = function() { s.settings.autoDelay > 0 ? setTimeout(o.startAuto, s.settings.autoDelay) : (o.startAuto(), t(window).focus(H).blur(W)), s.settings.autoHover && o.hover(function() { s.interval && (o.stopAuto(!0), s.autoPaused = !0) }, function() { s.autoPaused && (o.startAuto(!0), s.autoPaused = null) }) },
                O = function() { var e, i, n, r, a, l, d, c, g = 0; "next" === s.settings.autoDirection ? o.append(s.children.clone().addClass("bx-clone")) : (o.prepend(s.children.clone().addClass("bx-clone")), e = s.children.first().position(), g = "horizontal" === s.settings.mode ? -e.left : -e.top), S(g, "reset", 0), s.settings.pager = !1, s.settings.controls = !1, s.settings.autoControls = !1, s.settings.tickerHover && (s.usingCSS ? (r = "horizontal" === s.settings.mode ? 4 : 5, s.viewport.hover(function() { i = o.css("-" + s.cssPrefix + "-transform"), n = parseFloat(i.split(",")[r]), S(n, "reset", 0) }, function() { c = 0, s.children.each(function(e) { c += "horizontal" === s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0) }), a = s.settings.speed / c, l = "horizontal" === s.settings.mode ? "left" : "top", d = a * (c - Math.abs(parseInt(n))), F(d) })) : s.viewport.hover(function() { o.stop() }, function() { c = 0, s.children.each(function(e) { c += "horizontal" === s.settings.mode ? t(this).outerWidth(!0) : t(this).outerHeight(!0) }), a = s.settings.speed / c, l = "horizontal" === s.settings.mode ? "left" : "top", d = a * (c - Math.abs(parseInt(o.css(l)))), F(d) })), F() },
                F = function(t) {
                    var e, i, n, r = t || s.settings.speed,
                        a = { left: 0, top: 0 },
                        l = { left: 0, top: 0 };
                    "next" === s.settings.autoDirection ? a = o.find(".bx-clone").first().position() : l = s.children.first().position(), e = "horizontal" === s.settings.mode ? -a.left : -a.top, i = "horizontal" === s.settings.mode ? -l.left : -l.top, n = { resetValue: i }, S(e, "ticker", r, n)
                },
                N = function(e) {
                    var i = t(window),
                        n = { top: i.scrollTop(), left: i.scrollLeft() },
                        s = e.offset();
                    return n.right = n.left + i.width(), n.bottom = n.top + i.height(), s.right = s.left + e.outerWidth(), s.bottom = s.top + e.outerHeight(), !(n.right < s.left || n.left > s.right || n.bottom < s.top || n.top > s.bottom)
                },
                B = function(t) { var e = document.activeElement.tagName.toLowerCase(); if (null == new RegExp(e, ["i"]).exec("input|textarea") && N(o)) { if (39 === t.keyCode) return P(t), !1; if (37 === t.keyCode) return E(t), !1 } },
                X = function() { s.touch = { start: { x: 0, y: 0 }, end: { x: 0, y: 0 } }, s.viewport.on("touchstart MSPointerDown pointerdown", Y), s.viewport.on("click", ".bxslider a", function(t) { s.viewport.hasClass("click-disabled") && (t.preventDefault(), s.viewport.removeClass("click-disabled")) }) },
                Y = function(t) {
                    if ("touchstart" === t.type || 0 === t.button)
                        if (t.preventDefault(), s.controls.el.addClass("disabled"), s.working) s.controls.el.removeClass("disabled");
                        else {
                            s.touch.originalPos = o.position();
                            var e = t.originalEvent,
                                i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                                n = "function" == typeof PointerEvent;
                            if (n && void 0 === e.pointerId) return;
                            s.touch.start.x = i[0].pageX, s.touch.start.y = i[0].pageY, s.viewport.get(0).setPointerCapture && (s.pointerId = e.pointerId, s.viewport.get(0).setPointerCapture(s.pointerId)), s.originalClickTarget = e.originalTarget || e.target, s.originalClickButton = e.button, s.originalClickButtons = e.buttons, s.originalEventType = e.type, s.hasMove = !1, s.viewport.on("touchmove MSPointerMove pointermove", R), s.viewport.on("touchend MSPointerUp pointerup", Z), s.viewport.on("MSPointerCancel pointercancel", V)
                        }
                },
                V = function(t) { t.preventDefault(), S(s.touch.originalPos.left, "reset", 0), s.controls.el.removeClass("disabled"), s.viewport.off("MSPointerCancel pointercancel", V), s.viewport.off("touchmove MSPointerMove pointermove", R), s.viewport.off("touchend MSPointerUp pointerup", Z), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId) },
                R = function(t) {
                    var e = t.originalEvent,
                        i = void 0 !== e.changedTouches ? e.changedTouches : [e],
                        n = Math.abs(i[0].pageX - s.touch.start.x),
                        o = Math.abs(i[0].pageY - s.touch.start.y),
                        r = 0,
                        a = 0;
                    s.hasMove = !0, 3 * n > o && s.settings.preventDefaultSwipeX ? t.preventDefault() : 3 * o > n && s.settings.preventDefaultSwipeY && t.preventDefault(), "touchmove" !== t.type && t.preventDefault(), "fade" !== s.settings.mode && s.settings.oneToOneTouch && ("horizontal" === s.settings.mode ? (a = i[0].pageX - s.touch.start.x, r = s.touch.originalPos.left + a) : (a = i[0].pageY - s.touch.start.y, r = s.touch.originalPos.top + a), S(r, "reset", 0))
                },
                Z = function(e) {
                    e.preventDefault(), s.viewport.off("touchmove MSPointerMove pointermove", R), s.controls.el.removeClass("disabled");
                    var i = e.originalEvent,
                        n = void 0 !== i.changedTouches ? i.changedTouches : [i],
                        r = 0,
                        a = 0;
                    s.touch.end.x = n[0].pageX, s.touch.end.y = n[0].pageY, "fade" === s.settings.mode ? (a = Math.abs(s.touch.start.x - s.touch.end.x)) >= s.settings.swipeThreshold && (s.touch.start.x > s.touch.end.x ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : ("horizontal" === s.settings.mode ? (a = s.touch.end.x - s.touch.start.x, r = s.touch.originalPos.left) : (a = s.touch.end.y - s.touch.start.y, r = s.touch.originalPos.top), !s.settings.infiniteLoop && (0 === s.active.index && a > 0 || s.active.last && a < 0) ? S(r, "reset", 200) : Math.abs(a) >= s.settings.swipeThreshold ? (a < 0 ? o.goToNextSlide() : o.goToPrevSlide(), o.stopAuto()) : S(r, "reset", 200)), s.viewport.off("touchend MSPointerUp pointerup", Z), s.viewport.get(0).releasePointerCapture && s.viewport.get(0).releasePointerCapture(s.pointerId), !1 !== s.hasMove || 0 !== s.originalClickButton && "touchstart" !== s.originalEventType || t(s.originalClickTarget).trigger({ type: "click", button: s.originalClickButton, buttons: s.originalClickButtons })
                },
                U = function(e) {
                    if (s.initialized)
                        if (s.working) window.setTimeout(U, 10);
                        else {
                            var i = t(window).width(),
                                n = t(window).height();
                            r === i && a === n || (r = i, a = n, o.redrawSlider(), s.settings.onSliderResize.call(o, s.active.index))
                        }
                },
                j = function(t) {
                    var e = v();
                    s.settings.ariaHidden && !s.settings.ticker && (s.children.attr("aria-hidden", "true"), s.children.slice(t, t + e).attr("aria-hidden", "false"))
                },
                Q = function(t) { return t < 0 ? s.settings.infiniteLoop ? f() - 1 : s.active.index : t >= f() ? s.settings.infiniteLoop ? 0 : s.active.index : t };
            return o.goToSlide = function(e, i) {
                var n, r, a, l, d = !0,
                    c = 0,
                    g = { left: 0, top: 0 },
                    u = null;
                if (s.oldIndex = s.active.index, s.active.index = Q(e), !s.working && s.active.index !== s.oldIndex) { if (s.working = !0, void 0 !== (d = s.settings.onSlideBefore.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index)) && !d) return s.active.index = s.oldIndex, void(s.working = !1); "next" === i ? s.settings.onSlideNext.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index) || (d = !1) : "prev" === i && (s.settings.onSlidePrev.call(o, s.children.eq(s.active.index), s.oldIndex, s.active.index) || (d = !1)), s.active.last = s.active.index >= f() - 1, (s.settings.pager || s.settings.pagerCustom) && z(s.active.index), s.settings.controls && q(), "fade" === s.settings.mode ? (s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({ height: p() }, s.settings.adaptiveHeightSpeed), s.children.filter(":visible").fadeOut(s.settings.speed).css({ zIndex: 0 }), s.children.eq(s.active.index).css("zIndex", s.settings.slideZIndex + 1).fadeIn(s.settings.speed, function() { t(this).css("zIndex", s.settings.slideZIndex), A() })) : (s.settings.adaptiveHeight && s.viewport.height() !== p() && s.viewport.animate({ height: p() }, s.settings.adaptiveHeightSpeed), !s.settings.infiniteLoop && s.carousel && s.active.last ? "horizontal" === s.settings.mode ? (u = s.children.eq(s.children.length - 1), g = u.position(), c = s.viewport.width() - u.outerWidth()) : (n = s.children.length - s.settings.minSlides, g = s.children.eq(n).position()) : s.carousel && s.active.last && "prev" === i ? (r = 1 === s.settings.moveSlides ? s.settings.maxSlides - x() : (f() - 1) * x() - (s.children.length - s.settings.maxSlides), u = o.children(".bx-clone").eq(r), g = u.position()) : "next" === i && 0 === s.active.index ? (g = o.find("> .bx-clone").eq(s.settings.maxSlides).position(), s.active.last = !1) : e >= 0 && (l = e * parseInt(x()), g = s.children.eq(l).position()), void 0 !== g && (a = "horizontal" === s.settings.mode ? -(g.left - c) : -g.top, S(a, "slide", s.settings.speed)), s.working = !1), s.settings.ariaHidden && j(s.active.index * x()) }
            }, o.goToNextSlide = function() {
                if ((s.settings.infiniteLoop || !s.active.last) && !0 !== s.working) {
                    var t = parseInt(s.active.index) + 1;
                    o.goToSlide(t, "next")
                }
            }, o.goToPrevSlide = function() {
                if ((s.settings.infiniteLoop || 0 !== s.active.index) && !0 !== s.working) {
                    var t = parseInt(s.active.index) - 1;
                    o.goToSlide(t, "prev")
                }
            }, o.startAuto = function(t) { s.interval || (s.interval = setInterval(function() { "next" === s.settings.autoDirection ? o.goToNextSlide() : o.goToPrevSlide() }, s.settings.pause), s.settings.onAutoChange.call(o, !0), s.settings.autoControls && !0 !== t && D("stop")) }, o.stopAuto = function(t) { s.autoPaused && (s.autoPaused = !1), s.interval && (clearInterval(s.interval), s.interval = null, s.settings.onAutoChange.call(o, !1), s.settings.autoControls && !0 !== t && D("start")) }, o.getCurrentSlide = function() { return s.active.index }, o.getCurrentSlideElement = function() { return s.children.eq(s.active.index) }, o.getSlideElement = function(t) { return s.children.eq(t) }, o.getSlideCount = function() { return s.children.length }, o.isWorking = function() { return s.working }, o.redrawSlider = function() { s.children.add(o.find(".bx-clone")).outerWidth(h()), s.viewport.css("height", p()), s.settings.ticker || m(), s.active.last && (s.active.index = f() - 1), s.active.index >= f() && (s.active.last = !0), s.settings.pager && !s.settings.pagerCustom && (w(), z(s.active.index)), s.settings.ariaHidden && j(s.active.index * x()) }, o.destroySlider = function() { s.initialized && (s.initialized = !1, t(".bx-clone", this).remove(), s.children.each(function() { void 0 !== t(this).data("origStyle") ? t(this).attr("style", t(this).data("origStyle")) : t(this).removeAttr("style") }), void 0 !== t(this).data("origStyle") ? this.attr("style", t(this).data("origStyle")) : t(this).removeAttr("style"), t(this).unwrap().unwrap(), s.controls.el && s.controls.el.remove(), s.controls.next && s.controls.next.remove(), s.controls.prev && s.controls.prev.remove(), s.pagerEl && s.settings.controls && !s.settings.pagerCustom && s.pagerEl.remove(), t(".bx-caption", this).remove(), s.controls.autoEl && s.controls.autoEl.remove(), clearInterval(s.interval), s.settings.responsive && t(window).off("resize", U), s.settings.keyboardEnabled && t(document).off("keydown", B), t(this).removeData("bxSlider"), t(window).off("blur", W).off("focus", H)) }, o.reloadSlider = function(e) { void 0 !== e && (n = e), o.destroySlider(), l(), t(o).data("bxSlider", this) }, l(), t(o).data("bxSlider", this), this
        }
    }
}(jQuery);

/*
====================================================
counter CODE
====================================================
*/

$(function() {

    // ! Counter (used for Social Proof)

    /* Usage example
        <div id="counters_1">
            <div ="counter" data-TargetNum="10" data-Speed="6000"></div>
            <div class="counter" data-TargetNum="7" data-Speed="7000" 
            data-Direction="reverse" data-Easing="linear"></div>
            <div class="counter" data-TargetNum="80333" data-Speed="2500">0</div>
        </div>
        <div id="counters_2">
            <div class="counter" data-TargetNum="4200" data-Speed="1000">0</div>
            <div class="counter" data-TargetNum="4500" data-Speed="4000">0</div>
            <div class="counter" data-TargetNum="4743">0</div>
        </div>
        <div id="counters_3">
            <div class="counter" data-TargetNum="5200" data-Speed="1000">0</div>
            <div class="counter" data-TargetNum="5500" data-Speed="4000">0</div>
            <div class="counter" data-TargetNum="5743">0</div>
        </div>
    
       Required attr: data-TargetNum
       Optionals attr: data-Speed(milisecons), data-Direction(reverse), data-Easing(linear, swing)

       **CONFIG**
       Please set a the ID's to watch, a class for all counters and a default speed

       Avoid to use this script in pages where it isn't needed
    */

    // CONFIG
    let visibilityIds = ['#counters_1', '#counters_2', '#counters_3']; //must be an array, could have only one element
    let counterClass = '.counter';
    let defaultSpeed = 3000; //default value

    // END CONFIG

    //init if it becomes visible by scrolling
    $(window).on('scroll', function() {
        getVisibilityStatus();
    });

    //init if it's visible by page loading
    getVisibilityStatus();

    function getVisibilityStatus() {
        elValFromTop = [];
        var windowHeight = $(window).height(),
            windowScrollValFromTop = $(this).scrollTop();

        visibilityIds.forEach(function(item, index) { //Call each class
            try { //avoid error if class not exist
                elValFromTop[index] = Math.ceil($(item).offset().top);
            } catch (err) {
                return;
            }
            // if the sum of the window height and scroll distance from the top is greater than the target element's distance from the top, 
            //it should be in view and the event should fire, otherwise reverse any previously applied methods
            if ((windowHeight + windowScrollValFromTop) > elValFromTop[index]) {
                counter_init(item);
            }
        });
    }

    function counter_init(groupId) {
        let num, speed, direction, index = 0;
        $(counterClass).each(function() {
            num = $(this).attr('data-TargetNum');
            speed = $(this).attr('data-Speed');
            direction = $(this).attr('data-Direction');
            easing = $(this).attr('data-Easing');
            if (speed == undefined) speed = defaultSpeed;
            $(this).addClass('c_' + index); //add a class to recognize each counter
            doCount(num, index, speed, groupId, direction, easing);
            index++;
        });
    }

    function doCount(num, index, speed, groupClass, direction, easing) {
        let className = groupClass + ' ' + counterClass + '.' + 'c_' + index;
        if (easing == undefined) easing = "swing";
        $(className).animate({
            num
        }, {
            duration: +speed,
            easing: easing,
            step: function(now) {
                if (direction == 'reverse') {
                    $(this).text(num - Math.floor(now));
                } else {
                    $(this).text(Math.floor(now));
                }
            },
            complete: doCount
        });
    }
})