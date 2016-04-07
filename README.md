# gulp-source-link-update


# Install

```
npm install gulp-source-link-update --save-dev
```

# Basic Usage

Something like this will update your html source link(like css, js):

```javascript
'use strict';

var gulp = require('gulp');
var sourceUpdate = require('gulp-source-link-update');

gulp.task('build', function () {
  return gulp.src('./**/*.html')
    .pipe(gulp.dest('./dist'));
});

```
### Demonstration effect

original html：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/common.js"></script>
</head>
<body>

<script src="js/core.js"></script>
</body>
</html>

```

update html: 
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,initial-scale=1.0,user-scalable=no" />
    <meta name="apple-touch-fullscreen" content="yes" />
    <meta name="format-detection" content="telephone=no" />
    <title></title>
    <link rel="stylesheet" href="css/style.css?v=1459993195022">
    <script src="js/common.js?v=1459993195022"></script>
</head>
<body>

<script src="js/core.js?v=1459993195022"></script>
</body>
</html>

```

### next Version will update for

+ add exclude file and directory
+ add custom timestamp
+ error Message


