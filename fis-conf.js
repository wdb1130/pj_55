// default settings. fis3 release

fis.match('::package', {
  postpackager: fis.plugin('loader')
});


fis.match('*.{js,css,png,jpg,gif,jpeg,scss}', {
  useHash: true
});

// 启用插件 
fis.hook('relative');
// 让所有文件，都使用相对路径。 
fis.match('**', { relative: true })


fis.match('/js/*.js', {
  optimizer: fis.plugin('uglify-js'),
  // packTo: '/js/aio.js',
  parser: fis.plugin('translate-es6', {
    presets: ['es2015']
  })
})


fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
})

fis.match('*.scss', {
  parser: fis.plugin('node-sass'),
  optimizer: fis.plugin('clean-css'),
  rExt: '.css'
});

fis.match('*.html', {
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});



fis.match('*.png', {
  // 内置压缩png图片
  optimizer: fis.plugin('png-compressor')
});

// 版本差异
fis.media('debug').match('*.{js,css,png}', {
  useHash: false,
  useSprite: false,
  optimizer: null
})

fis.media('prod').match('*.js', {
  // 内置压缩js文件
  optimizer: fis.plugin('uglify-js')
});

// Global end

// default media is `dev`
fis.media('dev')
  .match('*', {
    useHash: false,
    optimizer: null
  });

// extends GLOBAL config
fis.media('production');



// fis3 release  发布
// fis3 release -w  文件监听
// fis3 release --wL  浏览器自动刷新
// fis3 release -d /Users/my-name/work/htdocs  替代内置server 
// fis3 release prod -d ./dist  发布版本



// fis3 server start 启动
// fis3 release -h



// 文件合并
// fis.match('*.{less,css}', {
//   packTo: '/static/aio.css'
// });

// fis.match('*.js', {
//   packTo: '/static/aio.js'
// });
