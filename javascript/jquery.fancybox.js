! function(e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(d) {
    var u, n, p, o, f, t, l = "Close",
        c = "BeforeClose",
        m = "MarkupParse",
        g = "Open",
        a = "Change",
        i = "mfp",
        v = "." + i,
        h = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        e = function() {},
        y = !!window.jQuery,
        C = d(window),
        w = function(e, t) {
            u.ev.on(i + e + v, t)
        },
        b = function(e, t, i, n) {
            var o = document.createElement("div");
            return o.className = "mfp-" + e, i && (o.innerHTML = i), n ? t && t.appendChild(o) : (o = d(o), t && o.appendTo(t)), o
        },
        I = function(e, t) {
            u.ev.triggerHandler(i + e, t), u.st.callbacks && (e = e.charAt(0).toLowerCase() + e.slice(1), u.st.callbacks[e] && u.st.callbacks[e].apply(u, d.isArray(t) ? t : [t]))
        },
        x = function(e) {
            return e === t && u.currTemplate.closeBtn || (u.currTemplate.closeBtn = d(u.st.closeMarkup.replace("%title%", u.st.tClose)), t = e), u.currTemplate.closeBtn
        },
        k = function() {
            d.magnificPopup.instance || ((u = new e).init(), d.magnificPopup.instance = u)
        };
    e.prototype = {
        constructor: e,
        init: function() {
            var e = navigator.appVersion;
            u.isLowIE = u.isIE8 = document.all && !document.addEventListener, u.isAndroid = /android/gi.test(e), u.isIOS = /iphone|ipad|ipod/gi.test(e), u.supportsTransition = function() {
                var e = document.createElement("p").style,
                    t = ["ms", "O", "Moz", "Webkit"];
                if (void 0 !== e.transition) return !0;
                for (; t.length;)
                    if (t.pop() + "Transition" in e) return !0;
                return !1
            }(), u.probablyMobile = u.isAndroid || u.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), p = d(document), u.popupsCache = {}
        },
        open: function(e) {
            var t;
            if (!1 === e.isObj) {
                u.items = e.items.toArray(), u.index = 0;
                var i, n = e.items;
                for (t = 0; t < n.length; t++)
                    if ((i = n[t]).parsed && (i = i.el[0]), i === e.el[0]) {
                        u.index = t;
                        break
                    }
            } else u.items = d.isArray(e.items) ? e.items : [e.items], u.index = e.index || 0;
            if (!u.isOpen) {
                u.types = [], f = "", e.mainEl && e.mainEl.length ? u.ev = e.mainEl.eq(0) : u.ev = p, e.key ? (u.popupsCache[e.key] || (u.popupsCache[e.key] = {}), u.currTemplate = u.popupsCache[e.key]) : u.currTemplate = {}, u.st = d.extend(!0, {}, d.magnificPopup.defaults, e), u.fixedContentPos = "auto" === u.st.fixedContentPos ? !u.probablyMobile : u.st.fixedContentPos, u.st.modal && (u.st.closeOnContentClick = !1, u.st.closeOnBgClick = !1, u.st.showCloseBtn = !1, u.st.enableEscapeKey = !1), u.bgOverlay || (u.bgOverlay = b("bg").on("click" + v, function() {
                    u.close()
                }), u.wrap = b("wrap").attr("tabindex", -1).on("click" + v, function(e) {
                    u._checkIfClose(e.target) && u.close()
                }), u.container = b("container", u.wrap)), u.contentContainer = b("content"), u.st.preloader && (u.preloader = b("preloader", u.container, u.st.tLoading));
                var o = d.magnificPopup.modules;
                for (t = 0; t < o.length; t++) {
                    var r = o[t];
                    r = r.charAt(0).toUpperCase() + r.slice(1), u["init" + r].call(u)
                }
                I("BeforeOpen"), u.st.showCloseBtn && (u.st.closeBtnInside ? (w(m, function(e, t, i, n) {
                    i.close_replaceWith = x(n.type)
                }), f += " mfp-close-btn-in") : u.wrap.append(x())), u.st.alignTop && (f += " mfp-align-top"), u.fixedContentPos ? u.wrap.css({
                    overflow: u.st.overflowY,
                    overflowX: "hidden",
                    overflowY: u.st.overflowY
                }) : u.wrap.css({
                    top: C.scrollTop(),
                    position: "absolute"
                }), (!1 === u.st.fixedBgPos || "auto" === u.st.fixedBgPos && !u.fixedContentPos) && u.bgOverlay.css({
                    height: p.height(),
                    position: "absolute"
                }), u.st.enableEscapeKey && p.on("keyup" + v, function(e) {
                    27 === e.keyCode && u.close()
                }), C.on("resize" + v, function() {
                    u.updateSize()
                }), u.st.closeOnContentClick || (f += " mfp-auto-cursor"), f && u.wrap.addClass(f);
                var a = u.wH = C.height(),
                    s = {};
                if (u.fixedContentPos && u._hasScrollBar(a)) {
                    var l = u._getScrollbarSize();
                    l && (s.marginRight = l)
                }
                u.fixedContentPos && (u.isIE7 ? d("body, html").css("overflow", "hidden") : s.overflow = "hidden");
                var c = u.st.mainClass;
                return u.isIE7 && (c += " mfp-ie7"), c && u._addClassToMFP(c), u.updateItemHTML(), I("BuildControls"), d("html").css(s), u.bgOverlay.add(u.wrap).prependTo(u.st.prependTo || d(document.body)), u._lastFocusedEl = document.activeElement, setTimeout(function() {
                    u.content ? (u._addClassToMFP(h), u._setFocus()) : u.bgOverlay.addClass(h), p.on("focusin" + v, u._onFocusIn)
                }, 16), u.isOpen = !0, u.updateSize(a), I(g), e
            }
            u.updateItemHTML()
        },
        close: function() {
            u.isOpen && (I(c), u.isOpen = !1, u.st.removalDelay && !u.isLowIE && u.supportsTransition ? (u._addClassToMFP(r), setTimeout(function() {
                u._close()
            }, u.st.removalDelay)) : u._close())
        },
        _close: function() {
            I(l);
            var e = r + " " + h + " ";
            if (u.bgOverlay.detach(), u.wrap.detach(), u.container.empty(), u.st.mainClass && (e += u.st.mainClass + " "), u._removeClassFromMFP(e), u.fixedContentPos) {
                var t = {
                    marginRight: ""
                };
                u.isIE7 ? d("body, html").css("overflow", "") : t.overflow = "", d("html").css(t)
            }
            p.off("keyup.mfp focusin" + v), u.ev.off(v), u.wrap.attr("class", "mfp-wrap").removeAttr("style"), u.bgOverlay.attr("class", "mfp-bg"), u.container.attr("class", "mfp-container"), !u.st.showCloseBtn || u.st.closeBtnInside && !0 !== u.currTemplate[u.currItem.type] || u.currTemplate.closeBtn && u.currTemplate.closeBtn.detach(), u.st.autoFocusLast && u._lastFocusedEl && d(u._lastFocusedEl).focus(), u.currItem = null, u.content = null, u.currTemplate = null, u.prevHeight = 0, I("AfterClose")
        },
        updateSize: function(e) {
            if (u.isIOS) {
                var t = document.documentElement.clientWidth / window.innerWidth,
                    i = window.innerHeight * t;
                u.wrap.css("height", i), u.wH = i
            } else u.wH = e || C.height();
            u.fixedContentPos || u.wrap.css("height", u.wH), I("Resize")
        },
        updateItemHTML: function() {
            var e = u.items[u.index];
            u.contentContainer.detach(), u.content && u.content.detach(), e.parsed || (e = u.parseEl(u.index));
            var t = e.type;
            if (I("BeforeChange", [u.currItem ? u.currItem.type : "", t]), u.currItem = e, !u.currTemplate[t]) {
                var i = !!u.st[t] && u.st[t].markup;
                I("FirstMarkupParse", i), u.currTemplate[t] = !i || d(i)
            }
            o && o !== e.type && u.container.removeClass("mfp-" + o + "-holder");
            var n = u["get" + t.charAt(0).toUpperCase() + t.slice(1)](e, u.currTemplate[t]);
            u.appendContent(n, t), e.preloaded = !0, I(a, e), o = e.type, u.container.prepend(u.contentContainer), I("AfterChange")
        },
        appendContent: function(e, t) {
            (u.content = e) ? u.st.showCloseBtn && u.st.closeBtnInside && !0 === u.currTemplate[t] ? u.content.find(".mfp-close").length || u.content.append(x()) : u.content = e: u.content = "", I("BeforeAppend"), u.container.addClass("mfp-" + t + "-holder"), u.contentContainer.append(u.content)
        },
        parseEl: function(e) {
            var t, i = u.items[e];
            if ((i = i.tagName ? {
                    el: d(i)
                } : (t = i.type, {
                    data: i,
                    src: i.src
                })).el) {
                for (var n = u.types, o = 0; o < n.length; o++)
                    if (i.el.hasClass("mfp-" + n[o])) {
                        t = n[o];
                        break
                    }
                i.src = i.el.attr("data-mfp-src"), i.src || (i.src = i.el.attr("href"))
            }
            return i.type = t || u.st.type || "inline", i.index = e, i.parsed = !0, u.items[e] = i, I("ElementParse", i), u.items[e]
        },
        addGroup: function(t, i) {
            var e = function(e) {
                e.mfpEl = this, u._openClick(e, t, i)
            };
            i || (i = {});
            var n = "click.magnificPopup";
            i.mainEl = t, i.items ? (i.isObj = !0, t.off(n).on(n, e)) : (i.isObj = !1, i.delegate ? t.off(n).on(n, i.delegate, e) : (i.items = t).off(n).on(n, e))
        },
        _openClick: function(e, t, i) {
            if ((void 0 !== i.midClick ? i.midClick : d.magnificPopup.defaults.midClick) || !(2 === e.which || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey)) {
                var n = void 0 !== i.disableOn ? i.disableOn : d.magnificPopup.defaults.disableOn;
                if (n)
                    if (d.isFunction(n)) {
                        if (!n.call(u)) return !0
                    } else if (C.width() < n) return !0;
                e.type && (e.preventDefault(), u.isOpen && e.stopPropagation()), i.el = d(e.mfpEl), i.delegate && (i.items = t.find(i.delegate)), u.open(i)
            }
        },
        updateStatus: function(e, t) {
            if (u.preloader) {
                n !== e && u.container.removeClass("mfp-s-" + n), t || "loading" !== e || (t = u.st.tLoading);
                var i = {
                    status: e,
                    text: t
                };
                I("UpdateStatus", i), e = i.status, t = i.text, u.preloader.html(t), u.preloader.find("a").on("click", function(e) {
                    e.stopImmediatePropagation()
                }), u.container.addClass("mfp-s-" + e), n = e
            }
        },
        _checkIfClose: function(e) {
            if (!d(e).hasClass(s)) {
                var t = u.st.closeOnContentClick,
                    i = u.st.closeOnBgClick;
                if (t && i) return !0;
                if (!u.content || d(e).hasClass("mfp-close") || u.preloader && e === u.preloader[0]) return !0;
                if (e === u.content[0] || d.contains(u.content[0], e)) {
                    if (t) return !0
                } else if (i && d.contains(document, e)) return !0;
                return !1
            }
        },
        _addClassToMFP: function(e) {
            u.bgOverlay.addClass(e), u.wrap.addClass(e)
        },
        _removeClassFromMFP: function(e) {
            this.bgOverlay.removeClass(e), u.wrap.removeClass(e)
        },
        _hasScrollBar: function(e) {
            return (u.isIE7 ? p.height() : document.body.scrollHeight) > (e || C.height())
        },
        _setFocus: function() {
            (u.st.focus ? u.content.find(u.st.focus).eq(0) : u.wrap).focus()
        },
        _onFocusIn: function(e) {
            return e.target === u.wrap[0] || d.contains(u.wrap[0], e.target) ? void 0 : (u._setFocus(), !1)
        },
        _parseMarkup: function(o, e, t) {
            var r;
            t.data && (e = d.extend(t.data, e)), I(m, [o, e, t]), d.each(e, function(e, t) {
                if (void 0 === t || !1 === t) return !0;
                if (1 < (r = e.split("_")).length) {
                    var i = o.find(v + "-" + r[0]);
                    if (0 < i.length) {
                        var n = r[1];
                        "replaceWith" === n ? i[0] !== t[0] && i.replaceWith(t) : "img" === n ? i.is("img") ? i.attr("src", t) : i.replaceWith(d("<img>").attr("src", t).attr("class", i.attr("class"))) : i.attr(r[1], t)
                    }
                } else o.find(v + "-" + e).html(t)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === u.scrollbarSize) {
                var e = document.createElement("div");
                e.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(e), u.scrollbarSize = e.offsetWidth - e.clientWidth, document.body.removeChild(e)
            }
            return u.scrollbarSize
        }
    }, d.magnificPopup = {
        instance: null,
        proto: e.prototype,
        modules: [],
        open: function(e, t) {
            return k(), (e = e ? d.extend(!0, {}, e) : {}).isObj = !0, e.index = t || 0, this.instance.open(e)
        },
        close: function() {
            return d.magnificPopup.instance && d.magnificPopup.instance.close()
        },
        registerModule: function(e, t) {
            t.options && (d.magnificPopup.defaults[e] = t.options), d.extend(this.proto, t.proto), this.modules.push(e)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close"><i class="ti-close"></i></button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, d.fn.magnificPopup = function(e) {
        k();
        var t = d(this);
        if ("string" == typeof e)
            if ("open" === e) {
                var i, n = y ? t.data("magnificPopup") : t[0].magnificPopup,
                    o = parseInt(arguments[1], 10) || 0;
                i = n.items ? n.items[o] : (i = t, n.delegate && (i = i.find(n.delegate)), i.eq(o)), u._openClick({
                    mfpEl: i
                }, t, n)
            } else u.isOpen && u[e].apply(u, Array.prototype.slice.call(arguments, 1));
        else e = d.extend(!0, {}, e), y ? t.data("magnificPopup", e) : t[0].magnificPopup = e, u.addGroup(t, e);
        return t
    };
    var T, _, P, S = "inline",
        E = function() {
            P && (_.after(P.addClass(T)).detach(), P = null)
        };
    d.magnificPopup.registerModule(S, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                u.types.push(S), w(l + "." + S, function() {
                    E()
                })
            },
            getInline: function(e, t) {
                if (E(), e.src) {
                    var i = u.st.inline,
                        n = d(e.src);
                    if (n.length) {
                        var o = n[0].parentNode;
                        o && o.tagName && (_ || (T = i.hiddenClass, _ = b(T), T = "mfp-" + T), P = n.after(_).detach().removeClass(T)), u.updateStatus("ready")
                    } else u.updateStatus("error", i.tNotFound), n = d("<div>");
                    return e.inlineElement = n
                }
                return u.updateStatus("ready"), u._parseMarkup(t, {}, e), t
            }
        }
    });
    var z, O = "ajax",
        M = function() {
            z && d(document.body).removeClass(z)
        },
        B = function() {
            M(), u.req && u.req.abort()
        };
    d.magnificPopup.registerModule(O, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                u.types.push(O), z = u.st.ajax.cursor, w(l + "." + O, B), w("BeforeChange." + O, B)
            },
            getAjax: function(o) {
                z && d(document.body).addClass(z), u.updateStatus("loading");
                var e = d.extend({
                    url: o.src,
                    success: function(e, t, i) {
                        var n = {
                            data: e,
                            xhr: i
                        };
                        I("ParseAjax", n), u.appendContent(d(n.data), O), o.finished = !0, M(), u._setFocus(), setTimeout(function() {
                            u.wrap.addClass(h)
                        }, 16), u.updateStatus("ready"), I("AjaxContentAdded")
                    },
                    error: function() {
                        M(), o.finished = o.loadError = !0, u.updateStatus("error", u.st.ajax.tError.replace("%url%", o.src))
                    }
                }, u.st.ajax.settings);
                return u.req = d.ajax(e), ""
            }
        }
    });
    var L;
    d.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var e = u.st.image,
                    t = ".image";
                u.types.push("image"), w(g + t, function() {
                    "image" === u.currItem.type && e.cursor && d(document.body).addClass(e.cursor)
                }), w(l + t, function() {
                    e.cursor && d(document.body).removeClass(e.cursor), C.off("resize" + v)
                }), w("Resize" + t, u.resizeImage), u.isLowIE && w("AfterChange", u.resizeImage)
            },
            resizeImage: function() {
                var e = u.currItem;
                if (e && e.img && u.st.image.verticalFit) {
                    var t = 0;
                    u.isLowIE && (t = parseInt(e.img.css("padding-top"), 10) + parseInt(e.img.css("padding-bottom"), 10)), e.img.css("max-height", u.wH - t)
                }
            },
            _onImageHasSize: function(e) {
                e.img && (e.hasSize = !0, L && clearInterval(L), e.isCheckingImgSize = !1, I("ImageHasSize", e), e.imgHidden && (u.content && u.content.removeClass("mfp-loading"), e.imgHidden = !1))
            },
            findImageSize: function(t) {
                var i = 0,
                    n = t.img[0],
                    o = function(e) {
                        L && clearInterval(L), L = setInterval(function() {
                            return 0 < n.naturalWidth ? void u._onImageHasSize(t) : (200 < i && clearInterval(L), void(3 === ++i ? o(10) : 40 === i ? o(50) : 100 === i && o(500)))
                        }, e)
                    };
                o(1)
            },
            getImage: function(e, t) {
                var i = 0,
                    n = function() {
                        e && (e.img[0].complete ? (e.img.off(".mfploader"), e === u.currItem && (u._onImageHasSize(e), u.updateStatus("ready")), e.hasSize = !0, e.loaded = !0, I("ImageLoadComplete")) : ++i < 200 ? setTimeout(n, 100) : o())
                    },
                    o = function() {
                        e && (e.img.off(".mfploader"), e === u.currItem && (u._onImageHasSize(e), u.updateStatus("error", r.tError.replace("%url%", e.src))), e.hasSize = !0, e.loaded = !0, e.loadError = !0)
                    },
                    r = u.st.image,
                    a = t.find(".mfp-img");
                if (a.length) {
                    var s = document.createElement("img");
                    s.className = "mfp-img", e.el && e.el.find("img").length && (s.alt = e.el.find("img").attr("alt")), e.img = d(s).on("load.mfploader", n).on("error.mfploader", o), s.src = e.src, a.is("img") && (e.img = e.img.clone()), 0 < (s = e.img[0]).naturalWidth ? e.hasSize = !0 : s.width || (e.hasSize = !1)
                }
                return u._parseMarkup(t, {
                    title: function(e) {
                        if (e.data && void 0 !== e.data.title) return e.data.title;
                        var t = u.st.image.titleSrc;
                        if (t) {
                            if (d.isFunction(t)) return t.call(u, e);
                            if (e.el) return e.el.attr(t) || ""
                        }
                        return ""
                    }(e),
                    img_replaceWith: e.img
                }, e), u.resizeImage(), e.hasSize ? (L && clearInterval(L), e.loadError ? (t.addClass("mfp-loading"), u.updateStatus("error", r.tError.replace("%url%", e.src))) : (t.removeClass("mfp-loading"), u.updateStatus("ready"))) : (u.updateStatus("loading"), e.loading = !0, e.hasSize || (e.imgHidden = !0, t.addClass("mfp-loading"), u.findImageSize(e))), t
            }
        }
    });
    var H;
    d.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(e) {
                return e.is("img") ? e : e.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var e, r = u.st.zoom,
                    t = ".zoom";
                if (r.enabled && u.supportsTransition) {
                    var i, n, o = r.duration,
                        a = function(e) {
                            var t = e.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                                i = "all " + r.duration / 1e3 + "s " + r.easing,
                                n = {
                                    position: "fixed",
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    "-webkit-backface-visibility": "hidden"
                                },
                                o = "transition";
                            return n["-webkit-" + o] = n["-moz-" + o] = n["-o-" + o] = n[o] = i, t.css(n), t
                        },
                        s = function() {
                            u.content.css("visibility", "visible")
                        };
                    w("BuildControls" + t, function() {
                        if (u._allowZoom()) {
                            if (clearTimeout(i), u.content.css("visibility", "hidden"), !(e = u._getItemToZoom())) return void s();
                            (n = a(e)).css(u._getOffset()), u.wrap.append(n), i = setTimeout(function() {
                                n.css(u._getOffset(!0)), i = setTimeout(function() {
                                    s(), setTimeout(function() {
                                        n.remove(), e = n = null, I("ZoomAnimationEnded")
                                    }, 16)
                                }, o)
                            }, 16)
                        }
                    }), w(c + t, function() {
                        if (u._allowZoom()) {
                            if (clearTimeout(i), u.st.removalDelay = o, !e) {
                                if (!(e = u._getItemToZoom())) return;
                                n = a(e)
                            }
                            n.css(u._getOffset(!0)), u.wrap.append(n), u.content.css("visibility", "hidden"), setTimeout(function() {
                                n.css(u._getOffset())
                            }, 16)
                        }
                    }), w(l + t, function() {
                        u._allowZoom() && (s(), n && n.remove(), e = null)
                    })
                }
            },
            _allowZoom: function() {
                return "image" === u.currItem.type
            },
            _getItemToZoom: function() {
                return !!u.currItem.hasSize && u.currItem.img
            },
            _getOffset: function(e) {
                var t, i = (t = e ? u.currItem.img : u.st.zoom.opener(u.currItem.el || u.currItem)).offset(),
                    n = parseInt(t.css("padding-top"), 10),
                    o = parseInt(t.css("padding-bottom"), 10);
                i.top -= d(window).scrollTop() - n;
                var r = {
                    width: t.width(),
                    height: (y ? t.innerHeight() : t[0].offsetHeight) - o - n
                };
                return void 0 === H && (H = void 0 !== document.createElement("p").style.MozTransform), H ? r["-moz-transform"] = r.transform = "translate(" + i.left + "px," + i.top + "px)" : (r.left = i.left, r.top = i.top), r
            }
        }
    });
    var A = "iframe",
        F = function(e) {
            if (u.currTemplate[A]) {
                var t = u.currTemplate[A].find("iframe");
                t.length && (e || (t[0].src = "//about:blank"), u.isIE8 && t.css("display", e ? "block" : "none"))
            }
        };
    d.magnificPopup.registerModule(A, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                u.types.push(A), w("BeforeChange", function(e, t, i) {
                    t !== i && (t === A ? F() : i === A && F(!0))
                }), w(l + "." + A, function() {
                    F()
                })
            },
            getIframe: function(e, t) {
                var i = e.src,
                    n = u.st.iframe;
                d.each(n.patterns, function() {
                    return -1 < i.indexOf(this.index) ? (this.id && (i = "string" == typeof this.id ? i.substr(i.lastIndexOf(this.id) + this.id.length, i.length) : this.id.call(this, i)), i = this.src.replace("%id%", i), !1) : void 0
                });
                var o = {};
                return n.srcAction && (o[n.srcAction] = i), u._parseMarkup(t, o, e), u.updateStatus("ready"), t
            }
        }
    });
    var j = function(e) {
            var t = u.items.length;
            return t - 1 < e ? e - t : e < 0 ? t + e : e
        },
        N = function(e, t, i) {
            return e.replace(/%curr%/gi, t + 1).replace(/%total%/gi, i)
        };
    d.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var r = u.st.gallery,
                    e = ".mfp-gallery";
                return u.direction = !0, !(!r || !r.enabled) && (f += " mfp-gallery", w(g + e, function() {
                    r.navigateByImgClick && u.wrap.on("click" + e, ".mfp-img", function() {
                        return 1 < u.items.length ? (u.next(), !1) : void 0
                    }), p.on("keydown" + e, function(e) {
                        37 === e.keyCode ? u.prev() : 39 === e.keyCode && u.next()
                    })
                }), w("UpdateStatus" + e, function(e, t) {
                    t.text && (t.text = N(t.text, u.currItem.index, u.items.length))
                }), w(m + e, function(e, t, i, n) {
                    var o = u.items.length;
                    i.counter = 1 < o ? N(r.tCounter, n.index, o) : ""
                }), w("BuildControls" + e, function() {
                    if (1 < u.items.length && r.arrows && !u.arrowLeft) {
                        var e = r.arrowMarkup,
                            t = u.arrowLeft = d(e.replace(/%title%/gi, r.tPrev).replace(/%dir%/gi, "left")).addClass(s),
                            i = u.arrowRight = d(e.replace(/%title%/gi, r.tNext).replace(/%dir%/gi, "right")).addClass(s);
                        t.click(function() {
                            u.prev()
                        }), i.click(function() {
                            u.next()
                        }), u.container.append(t.add(i))
                    }
                }), w(a + e, function() {
                    u._preloadTimeout && clearTimeout(u._preloadTimeout), u._preloadTimeout = setTimeout(function() {
                        u.preloadNearbyImages(), u._preloadTimeout = null
                    }, 16)
                }), void w(l + e, function() {
                    p.off(e), u.wrap.off("click" + e), u.arrowRight = u.arrowLeft = null
                }))
            },
            next: function() {
                u.direction = !0, u.index = j(u.index + 1), u.updateItemHTML()
            },
            prev: function() {
                u.direction = !1, u.index = j(u.index - 1), u.updateItemHTML()
            },
            goTo: function(e) {
                u.direction = e >= u.index, u.index = e, u.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var e, t = u.st.gallery.preload,
                    i = Math.min(t[0], u.items.length),
                    n = Math.min(t[1], u.items.length);
                for (e = 1; e <= (u.direction ? n : i); e++) u._preloadItem(u.index + e);
                for (e = 1; e <= (u.direction ? i : n); e++) u._preloadItem(u.index - e)
            },
            _preloadItem: function(e) {
                if (e = j(e), !u.items[e].preloaded) {
                    var t = u.items[e];
                    t.parsed || (t = u.parseEl(e)), I("LazyLoad", t), "image" === t.type && (t.img = d('<img class="mfp-img" />').on("load.mfploader", function() {
                        t.hasSize = !0
                    }).on("error.mfploader", function() {
                        t.hasSize = !0, t.loadError = !0, I("LazyLoadError", t)
                    }).attr("src", t.src)), t.preloaded = !0
                }
            }
        }
    });
    var W = "retina";
    d.magnificPopup.registerModule(W, {
        options: {
            replaceSrc: function(e) {
                return e.src.replace(/\.\w+$/, function(e) {
                    return "@2x" + e
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (1 < window.devicePixelRatio) {
                    var i = u.st.retina,
                        n = i.ratio;
                    1 < (n = isNaN(n) ? n() : n) && (w("ImageHasSize." + W, function(e, t) {
                        t.img.css({
                            "max-width": t.img[0].naturalWidth / n,
                            width: "100%"
                        })
                    }), w("ElementParse." + W, function(e, t) {
                        t.src = i.replaceSrc(t, n)
                    }))
                }
            }
        }
    }), k()
});