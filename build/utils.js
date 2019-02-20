'use strict'
const path = require('path')
const config = require('./base.config')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

/**
 *  获取项目下某个文件的绝对路径
 *  @param    {string}  dir 相对于项目根目录的路径
 *  @return   {string}  文件的绝对路径
 */
exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir)
}

/**
 *  根据src/pages下的文件夹数量来确定有哪些应用入口
 *  @return   {Object}  webpack的entry
 */
exports.getEntry = function () {
  const self = this
  // 此处多页面开发时编译会比较慢，可把pages修改为当前开发页面的名称
  const pages = fs.readdirSync(self.resolve('src/pages'));
  // const pages = [ 'indoor']
  const entry = {}
  pages
    .forEach(fileName => {
      entry[fileName] = self.resolve(`src/pages/${fileName}/index.js`)
    })
  return entry
}

/**
 *  根据入口名确定要生成哪些html页面
 *  @param    {Array.string}  entryNames 由应用入口名组成的数组
 *  @param    {boolean=}  minify     是否压缩，默认为false
 *  @return   {Array}  用于生成页面的plugins
 */
exports.getHtmlPlugins = function (entryNames, minify=false) {
  const self = this
  return entryNames
    .map(entryName => {
      let templatePath = self.resolve('index.html')
      let appTemplatePath = self.resolve(`src/pages/${entryName}/${entryName}.html`)
      if (fs.existsSync(appTemplatePath)) {
        // pages下存在和app同名的html，使用该html作为页面模板
        templatePath = appTemplatePath
      }
      const htmlWebpackPluginConfig = {
        // 产出时页面的文件名
        filename: `${entryName}.html`,
        // 模板路径
        template: templatePath,
        // 引入的资源不应包含其他的entry
        excludeChunks: entryNames.filter(curEntryName => curEntryName !== entryName)
      }
      if (minify) {
        // 为true说明页面需要压缩
        htmlWebpackPluginConfig.minify = {
          // 去注释
          removeComments: true,
          // 去空白
          collapseWhitespace: true,
          // 去除引用时的引号
          removeAttributeQuotes: true
        }
      }
      return new HtmlWebpackPlugin(htmlWebpackPluginConfig)
    })
}

exports.htmlIncludeAssets = function() {
  return new HtmlIncludeAssetsPlugin({
    assets: [
      'static/scripts/vendor.dll.js'],
    append: false // false 在其他资源的之前添加 true 在其他资源之后添加
  })
}