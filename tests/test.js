const assert = require('assert'),
    fs = require("fs"),
    path = require("path");

var { isStyleTag, isScriptTag, getStyleSrc, getScriptSrc, parseHtmlContent, parseHtml } = require("../index.js");

describe('解析功能测试', function() {
    
    describe('解析script', function() {
        it('返回script链接列表', function() {
            assert.deepEqual(
                getScriptSrc(fs.readFileSync("tests/demo1/index.html").toString()), ["js/test.js", "js/test2.js"]
            );
        });
        it("测试正确的script标签", function() {
            assert.equal(true, isStyleTag(`<link rel="stylesheet" href="css/test.css" type="text/css" />`));
        });
        it("测试错误的script标签", function() {
            assert.equal(false, isStyleTag(`<link1 rel="stylesheet" href="css/test.css" type="text/css" />`));
        });
    });
    
    describe('解析style', function() {
        it("测试正确的外链样式标签", function() {
            assert.equal(true, isStyleTag(`<link rel="stylesheet" href="css/test.css" type="text/css" />`));
        });
        it("测试错误的外链样式标签", function() {
            assert.equal(false, isStyleTag(`<link1 rel="stylesheet" href="css/test.css" type="text/css" />`));
        });
        it('返回style链接列表', function() {
            assert.deepEqual(
                getStyleSrc(fs.readFileSync("tests/demo1/index.html").toString()), ["css/test.css", "css/test2.css"]
            );
        });
    });

    describe("html读取测试", function () {
        it("读取html内容里的全部标记链接", function () {
            assert.deepEqual(parseHtmlContent(), {
                css: [
                    "css/test.css",
                    "css/test2.css",
                ],
                js: [
                    "js/test.js",
                    "js/test2.js",
                ]
            });
        });

        it("读取一个或者多个路径链接", function () {
            assert.deepEqual(parseHtml("tests/demo1/index.html"), {
                css: [
                    "css/test.css",
                    "css/test2.css",
                ],
                js: [
                    "js/test.js",
                    "js/test2.js",
                ]
            });
            assert.deepEqual(parseHtml(["tests/demo1/index.html", "tests/demo1/index-2.html"]), {
                css: [
                    "css/test.css",
                    "css/test2.css",
                    "css/test3.css",
                ],
                js: [
                    "js/test.js",
                    "js/test2.js",
                    "js/test3.js",
                ]
            });
        });

    });



});
