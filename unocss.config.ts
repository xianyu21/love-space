import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss'

const prefix = `li-`;
const exclude = [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]dist[\\/]/, /[\\/]tmui[\\/]/];

export default defineConfig({
    presets: [
        // https://github.com/MellowCo/unocss-preset-weapp
        presetWeapp({
            transform: false,
            prefix: prefix,
        }) as any,
    ],
    shortcuts: [
        {
            'border-base': 'border border-gray-500_10',
            'center': 'flex justify-center items-center',
        },
    ],
    // 规则之间共享配置的主题对象
    // theme: {},
    transformers: [
        // options 见https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
        transformerAttributify({
            nonValuedAttribute: true,
            classPrefix: prefix,
            exclude
        }) as any,
        // options 见https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
        transformerClass({
            exclude
        }),
    ],
})
