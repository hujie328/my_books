const { defineConfig } = require('@vue/cli-service')

// Element自动导入
const AutoImport = require('unplugin-auto-import/webpack').default
const Components = require('unplugin-vue-components/webpack').default
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')


// Element自动导入 图标
const Icons = require('unplugin-icons/webpack').default
const IconsResolver = require('unplugin-icons/resolver').default



module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      AutoImport({
        imports: ['vue'],
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({
            prefix: 'Icon',
          })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ['ep'],
          })
        ]
      }),
      Icons({
        autoInstall: true,
      })
    ]
  }
})
