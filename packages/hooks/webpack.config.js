const path = require('path');

module.exports = [
  // 1. ES 模块格式（供现代前端工程化使用）
  {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.esm.js',
      library: {
        type: 'module' // 输出 ES 模块
      },
      clean: true // 每次打包前清空 dist 目录
    },
    externals: {
      'react': 'react', // 将 React 标记为外部依赖
      'react-dom': 'react-dom' // 将 ReactDOM 标记为外部依赖（如果使用了）
    },
    experiments: {
      outputModule: true // 启用 ES 模块输出（Webpack 5+ 支持）
    },
    module: {
      rules: [
              {
          test: /\.ts$/, // 匹配 TS 文件
          exclude: /node_modules/,
          use: 'ts-loader' // 使用 ts-loader 处理
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', { modules: false }]] // 保留 ES 模块语法
            }
          }
        },
      ]
    },
    mode: 'production',
      resolve: {
    extensions: ['.ts', '.js'] // 按顺序尝试解析这些后缀
  }
  },

  // 2. CommonJS 格式（供 Node.js 环境使用）
  {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.cjs.js',
      library: {
        type: 'commonjs' // 输出 CommonJS 模块
      }
    },
    externals: {
      'react': 'react', // 将 React 标记为外部依赖
      'react-dom': 'react-dom' // 将 ReactDOM 标记为外部依赖（如果使用了）
    },
    target: 'node', // 针对 Node.js 环境
    module: {
      rules: [
              {
          test: /\.ts$/, // 匹配 TS 文件
          exclude: /node_modules/,
          use: 'ts-loader' // 使用 ts-loader 处理
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader' // 默认会将 ES 模块转为 CommonJS
        }
      ]
    },
    mode: 'production',
      resolve: {
    extensions: ['.ts', '.js'] // 按顺序尝试解析这些后缀
  }
  },

  // 3. UMD 格式（兼容浏览器全局变量、AMD、CommonJS）
  {
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'my-lib.umd.js',
      library: {
        name: 'MyLib', // 浏览器全局变量名称
        type: 'umd' // 输出 UMD 格式
      },
      globalObject: 'this' // 兼容浏览器和 Node.js 的全局对象
    },
    externals: {
      'react': {
        commonjs: 'react',
        commonjs2: 'react',
        amd: 'react',
        root: 'React' // 浏览器全局变量名称
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        amd: 'react-dom',
        root: 'ReactDOM' // 浏览器全局变量名称
      }
    },
    module: {
      rules: [
                    {
        test: /\.ts$/, // 匹配 TS 文件
        exclude: /node_modules/,
        use: 'ts-loader' // 使用 ts-loader 处理
      },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader'
        },

      ]
    },
    mode: 'production',
      resolve: {
    extensions: ['.ts', '.js'] // 按顺序尝试解析这些后缀
  }
  }
];