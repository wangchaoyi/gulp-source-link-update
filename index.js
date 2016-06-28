/**
 * Created by 55hudong on 2016/4/6.
 */

'use strict';
var gutil = require('gulp-util');
var through = require('through2');
var jsdom = require("jsdom");




module.exports = function (options) {


    return through.obj(function (file, enc, cb) {

        var _this = this;

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，抛出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        // 将文件内容转成字符串，file.contents.toString();
        // 然后将处理后的字符串，再转成Buffer形式
        var content = file.contents.toString();

        jsdom.env(
            content,
            ["http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"],
            function (err, window) {
                var $ = window.$;

                content = window.$("html")[0];

                $("script[class='jsdom']").remove();
                $("script").each(function () {
                    console.log(this.outerHTML);
                    this.src = `${this.src}?v=${Date.now()}`;
                });

                $("link").each(function () {
                    this.href = `${this.href}?v=${Date.now()}`;
                });

                content = "<!doctype html>\r"+content.outerHTML;

                file.contents = new Buffer(content);

                // 下面这两句基本是标配啦，可以参考下 through2 的API
                _this.push(file);

                cb();

            }
        );


    });
};