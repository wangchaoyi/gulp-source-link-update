/**
 * Created by 55hudong on 2016/4/6.
 */

'use strict';
var gutil = require('gulp-util');
var through = require('through2');

var htmlSourceLinkUpdate = {
    config: {
        cssStart: '<link.*[href=.][\"|\']',
        cssEnd: '[\"|\']\/>',
        jsStart: '<script.*src.*=[\"|\']',
        jsEnd: '[\"|\']>',
        queryString: '\\?.*'
    },
    cssReg: "",
    jsReg: "",
    init: function(){
        this.cssReg = new RegExp(this.config.cssStart + ".*" + this.config.cssEnd, "g");
        this.jsReg = new RegExp(this.config.jsStart + ".*" + this.config.jsEnd, "g");
    },
    render: function (html) {
        var _this = this;

        html = html.replace(this.cssReg, function(tag){
            var _tag = tag;

            var link = tag.replace(new RegExp(_this.config.cssStart), "").replace(new RegExp(_this.config.cssEnd), "");
            var newLink = link.replace(new RegExp(_this.config.queryString), "") + "?v=" + new Date().getTime();

            return tag.replace(link, newLink);
        });

        html = html.replace(this.jsReg, function(tag){
            var _tag = tag;

            var link = tag.replace(new RegExp(_this.config.jsStart), "").replace(new RegExp(_this.config.jsEnd), "");
            var newLink = link.replace(new RegExp(_this.config.queryString), "") + "?v=" + new Date().getTime();

            return tag.replace(link, newLink);
        });

        return html;
    }
}

htmlSourceLinkUpdate.init();

module.exports = function (options) {


    return through.obj(function (file, enc, cb) {

        // 如果文件为空，不做任何操作，转入下一个操作，即下一个 .pipe()
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        // 插件不支持对 Stream 对直接操作，跑出异常
        if (file.isStream()) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
            return cb();
        }

        // 将文件内容转成字符串，file.contents.toString();
        // 然后将处理后的字符串，再转成Buffer形式
        var content = file.contents.toString();

        content = htmlSourceLinkUpdate.render(content);

        file.contents = new Buffer(content);

        // 下面这两句基本是标配啦，可以参考下 through2 的API
        this.push(file);

        cb();
    });
};