var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
	//入口文件，以这个文件作为切入口
    entry: path.resolve(__dirname, 'app/index.jsx'),
    //输出文件
	output: {
        filename: "bundle.js"
    },

    resolve:{
        extensions:['.js','.jsx']
    },
	//可以不写后缀名的文件类型，这里统一写了以后引用js文件或jsx文件就不许再写后缀名

    module: {
		// loaders加载器，test是一个匹配，exclude是不要匹配的目录，loader是用什么加载器去加载匹配到的符合的文件
		// 旧版本不写-loader没问题，新版的貌似都要加-loader如，style-loader
		// 其中的“！” 相当于管道，如style!css!postcss!less  先执行style再执行css再执行postcss（postcss在下面）再执行less
        loaders: [
            { test: /\.(js|jsx)$/,  	exclude: /node_modules/, 	loader: 'babel-loader' },
            { test: /\.less$/, 			exclude: /node_modules/, 	loader: 'style-loader!css-loader!postcss-loader!less-loader' },
            { test: /\.css$/, 			exclude: /node_modules/, 	loader: 'style-loader!css-loader!postcss-loader' },
            { test: /\.(png|gif|jpg|jpeg|bmp)$/i, 					loader: 'url-loader?limit=5000' },  	// 限制大小5kb
            { test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 		loader: 'url-loader?limit=5000'}, 	// 限制大小小于5kb 识别字体图标
        ]
    },

    plugins: [
        // html 模板插件
		// 相当于以前的index.html中<script type="text/script" src="bundle.js"></script>
		// 这里用这个插件便不用像上面那样手动添加，而是webpack自动将编译好的文件放到一个html模板中
        new HtmlWebpackPlugin({
            template: __dirname + '/app/index.tmpl.html'
        }),

        // 热加载插件
        new webpack.HotModuleReplacementPlugin(),

        // 打开浏览器，会自动打开浏览器8080端口 
        new OpenBrowserPlugin({
         url: 'http://localhost:8080/#/home'
        }),

        // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
        new webpack.DefinePlugin({
          __DEV__: JSON.stringify(  JSON.parse( (process.env.NODE_ENV == 'dev') || false )  )
		  //__DEV__ : true
        }),
		

		
    ],

	devServer: {
		proxy: {
		  // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
		  // koa 代码在 ./mock 目录中，启动命令为 npm run mock
		  '/api': {
		  	changeOrigin: true,
			target: 'http://localhost:3000',
			secure: false
		  }
		},
		historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
		inline: true, //实时刷新
		hot: true  // 使用热加载插件 HotModuleReplacementPlugin
	}


}
