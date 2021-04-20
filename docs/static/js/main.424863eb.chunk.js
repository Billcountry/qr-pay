;(this["webpackJsonpqr-pay"] = this["webpackJsonpqr-pay"] || []).push([
    [0],
    {
        60: function (n, e, t) {},
        67: function (n, e, t) {
            "use strict"
            t.r(e)
            var o,
                a,
                i = t(0),
                r = t.n(i),
                s = t(7),
                c = t.n(s),
                l = (t(60), t(33)),
                d = t(39),
                u = t(40),
                m = t(49),
                h = t(48),
                p = t(35),
                b = t(96),
                f = t(101),
                g = t(103),
                j = t(12),
                x = (function (n) {
                    Object(m.a)(t, n)
                    var e = Object(h.a)(t)
                    function t(n) {
                        var o
                        return (
                            Object(d.a)(this, t),
                            ((o = e.call(this, n)).state = {
                                loading: !0,
                                images: null,
                                phonenumber: "",
                            }),
                            o
                        )
                    }
                    return (
                        Object(u.a)(t, [
                            {
                                key: "componentDidMount",
                                value: function () {
                                    var n = this
                                    fetch(
                                        "https://picsum.photos/v2/list?limit=4"
                                    )
                                        .then(function (n) {
                                            return n.json()
                                        })
                                        .then(function (e) {
                                            var t = e
                                            n.setState({
                                                images: t.map(function (n) {
                                                    return {
                                                        download_url:
                                                            n.download_url,
                                                        cost:
                                                            Math.floor(
                                                                10 *
                                                                    Math.random()
                                                            ) + 1,
                                                    }
                                                }),
                                                loading: !1,
                                            })
                                        })
                                },
                            },
                            {
                                key: "getCode",
                                value: function (n) {
                                    var e = this,
                                        t = this.state,
                                        o = t.images,
                                        a = t.phonenumber
                                    if (a.trim())
                                        this.setState({
                                            loading: !0,
                                            error: null,
                                        }),
                                            fetch(
                                                "https://sancom-gaxblohzcq-uc.a.run.app/make/order",
                                                {
                                                    method: "POST",
                                                    body: JSON.stringify({
                                                        amount: "".concat(
                                                            o[n].cost
                                                        ),
                                                        phonenumber: a.trim(),
                                                    }),
                                                    headers: {
                                                        "Content-Type":
                                                            "application/json",
                                                    },
                                                }
                                            )
                                                .then(function (t) {
                                                    200 === t.status &&
                                                        t
                                                            .blob()
                                                            .then(function (t) {
                                                                var a = new FileReader()
                                                                a.readAsDataURL(
                                                                    t
                                                                ),
                                                                    (a.onloadend = function () {
                                                                        ;(o[
                                                                            n
                                                                        ].code =
                                                                            a.result),
                                                                            e.setState(
                                                                                {
                                                                                    loading: !1,
                                                                                    images: o,
                                                                                }
                                                                            )
                                                                    })
                                                            })
                                                })
                                                .catch(function (t) {
                                                    o[n].code = null
                                                    e.setState({
                                                        loading: !1,
                                                        images: o,
                                                        error:
                                                            "An error occurred, please retry.",
                                                    })
                                                })
                                    else {
                                        this.setState({
                                            images: o,
                                            error: "Phone number is required",
                                        })
                                    }
                                },
                            },
                            {
                                key: "render",
                                value: function () {
                                    var n = this,
                                        e = this.state,
                                        t = e.loading,
                                        o = e.images,
                                        a = e.phonenumber,
                                        i = e.error
                                    return Object(j.jsxs)(v, {
                                        children: [
                                            Object(j.jsx)("img", {
                                                className: "logo",
                                                alt: "",
                                                src: "/banner.png",
                                            }),
                                            Object(j.jsxs)("div", {
                                                className: "inner",
                                                children: [
                                                    t &&
                                                        Object(j.jsx)(b.a, {
                                                            className:
                                                                "progress",
                                                        }),
                                                    !t &&
                                                        Object(j.jsx)(f.a, {
                                                            placeholder:
                                                                "254........",
                                                            label:
                                                                "Phone Number",
                                                            style: {
                                                                margin: 16,
                                                            },
                                                            value: a,
                                                            onChange: function (
                                                                e
                                                            ) {
                                                                return n.setState(
                                                                    {
                                                                        phonenumber:
                                                                            e
                                                                                .currentTarget
                                                                                .value,
                                                                    }
                                                                )
                                                            },
                                                        }),
                                                    Boolean(null !== o && !t) &&
                                                        Object(j.jsx)("div", {
                                                            className: "images",
                                                            children: o.map(
                                                                function (
                                                                    e,
                                                                    t
                                                                ) {
                                                                    return Object(
                                                                        j.jsxs
                                                                    )(
                                                                        O,
                                                                        {
                                                                            children: [
                                                                                Object(
                                                                                    j.jsx
                                                                                )(
                                                                                    "img",
                                                                                    {
                                                                                        className:
                                                                                            "main",
                                                                                        src:
                                                                                            e.download_url,
                                                                                        alt:
                                                                                            "",
                                                                                    }
                                                                                ),
                                                                                Boolean(
                                                                                    e.code
                                                                                ) &&
                                                                                    Object(
                                                                                        j.jsx
                                                                                    )(
                                                                                        "img",
                                                                                        {
                                                                                            className:
                                                                                                "qr",
                                                                                            src:
                                                                                                e.code,
                                                                                            alt:
                                                                                                "",
                                                                                        }
                                                                                    ),
                                                                                !e.code &&
                                                                                    Object(
                                                                                        j.jsxs
                                                                                    )(
                                                                                        "button",
                                                                                        {
                                                                                            className:
                                                                                                "buy",
                                                                                            onClick: n.getCode.bind(
                                                                                                n,
                                                                                                t
                                                                                            ),
                                                                                            children: [
                                                                                                "Buy @",
                                                                                                e.cost,
                                                                                            ],
                                                                                        }
                                                                                    ),
                                                                            ],
                                                                        },
                                                                        t
                                                                    )
                                                                }
                                                            ),
                                                        }),
                                                ],
                                            }),
                                            Boolean(i) &&
                                                Object(j.jsx)(g.a, {
                                                    open: !0,
                                                    message: i,
                                                }),
                                        ],
                                    })
                                },
                            },
                        ]),
                        t
                    )
                })(r.a.Component),
                v = p.a.div(
                    o ||
                        (o = Object(l.a)([
                            "\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    .inner {\n        width: 800px;\n        display: flex;\n        padding: 1em 0.5em;\n        flex-direction: column;\n        .progress {\n            align-self: center;\n        }\n        .images {\n            display: flex;\n            flex-wrap: wrap;\n            justify-content: space-around;\n        }\n    }\n    .logo {\n        height: 200px;\n        width: auto;\n    }\n    @media (max-width: 850px) {\n        .inner {\n            width: 95%;\n        }\n    }\n",
                        ]))
                ),
                O = p.a.div(
                    a ||
                        (a = Object(l.a)([
                            "\n    width: calc(50% - 25px);\n    position: relative;\n    background-color: #f1f1f1;\n    display: flex;\n    flex-direction: column;\n    margin-bottom: 10px;\n    border-radius: 5px;\n    .buy {\n        padding: 0.5em 1em;\n        background-color: #1b5e20ee;\n        border-radius: 1em;\n        outline: none;\n        color: #ffffff;\n        cursor: pointer;\n        border: 1px solid #ffffff;\n        min-width: 100px;\n        align-self: center;\n        bottom: 1em;\n        position: absolute;\n        &:hover {\n            background-color: #1b5e20;\n        }\n    }\n    img.main {\n        width: 100%;\n        height: auto;\n    }\n    img.qr {\n        width: 50%;\n        align-self: center;\n        bottom: 1em;\n        position: absolute;\n        opacity: 0.8;\n    }\n",
                        ]))
                ),
                y = function (n) {
                    n &&
                        n instanceof Function &&
                        t
                            .e(3)
                            .then(t.bind(null, 104))
                            .then(function (e) {
                                var t = e.getCLS,
                                    o = e.getFID,
                                    a = e.getFCP,
                                    i = e.getLCP,
                                    r = e.getTTFB
                                t(n), o(n), a(n), i(n), r(n)
                            })
                }
            c.a.render(
                Object(j.jsx)(r.a.StrictMode, {
                    children: Object(j.jsx)(x, {}),
                }),
                document.getElementById("root")
            ),
                y()
        },
    },
    [[67, 1, 2]],
])
//# sourceMappingURL=main.424863eb.chunk.js.map
