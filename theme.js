module.exports = () => {
    return {
        'hd': '2px',
// 文字色
        'color-text-base': '#333333',            // 基本
        'color-text-base-inverse': '#fff',         // 基本 - 反色
        'color-text-secondary': '#999999',          // 辅助色
        'color-text-placeholder': '#bbb',           // 文本框提示
        'color-text-disabled': '#bbb',              // 失效
        'color-text-caption': '#888',               // 辅助描述
        'color-text-ancillary': '#F74461',           //辅助字体
        'color-text-paragraph': '#333',             // 段落
        'color-icon': '#F74461',   //icon 辅助色

// 背景色
        'fill-base': '#fff',                           // 组件默认背景
        'fill-body': '#f4f4f4',                        // 页面背景
        'fill-tap': '#ddd',                            // 组件默认背景 - 按下
        'fill-disabled': '#ddd',                       // 通用失效背景
        'fill-mask': 'rgba(0, 0, 0, 0.4)',              // 遮罩背景
        'color-icon-base': '#ccc',                      // 许多小图标的背景，比如一些小圆点，加减号
        'fill-grey': '#f7f7f7',
        'fill-groud': '#F0F0F0',
        'fill-ancillary': '#FFDB53',  //黄色
        'fill-ancillary-red': '#F74461', //辅助背景  红色
        'fill-ancillary-blue': '#628FFB', //辅助背景  蓝色
        'fill-ancillary-yellow': '#FAC34C', //辅助背景  黄色
// 透明度
        'opacity-disabled': '0.3',   // switch checkbox radio 等组件禁用的透明度
// 全局/品牌色
        'brand-primary': '#FFDB53',  //主色/按钮 打开色
        'brand-primary-tap': '#1284d6',
        'brand-success': '#6abf47',
        'brand-warning': '#ffc600',
        'brand-error': '#f4333c',
        'brand-important': '#ff5b05',  // 用于小红点
        'brand-wait': '#108ee9',
// 边框色
        'border-color-base': '#EAEAEA',

// 字体尺寸
// ---
        'font-size-icontext': '20px',
        'font-size-caption-sm': '24px',
        'font-size-base': '28px',
        'font-size-subhead': '30px',
        'font-size-caption': '32px',
        'font-size-heading': '34px',

// 圆角
// ---
        'radius-xs': '2*2px',
        'radius-sm': '3*2px',
        'radius-md': '5*2px',
        'radius-lg': '7*2px',
        'radius-circle': '50%',

// 边框尺寸
// ---
        'border-width-sm': '1PX',
        'border-width-md': '1PX',
        'border-width-lg': '2*2px',
// 高度
// ---
        'line-height-base': '1',           // 单行行高
        'line-height-paragraph': '1.5',    // 多行行高

// 图标尺寸
// ---
        'icon-size-xxs': '15*2px',
        'icon-size-xs': '18*2px',
        'icon-size-sm': '21*2px',
        'icon-size-md': '22*2px',       // 导航条上的图标、grid的图标大小
        'icon-size-lg': '36*2px',

// 动画缓动
// ---
        'ease-in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',
        'grid-imge-height': '80px',

    }
};
