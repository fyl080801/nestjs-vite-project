<script lang="ts" setup>
import { reactive, computed, watch } from 'vue';
import { ElMessage, ElColorPicker, version } from 'element-plus';
import { useSettingsStore } from '../../store';

// const version = require('element-plus/package.json').version; // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF'; // default color
const emit = defineEmits(['change']);

const { state } = useSettingsStore();
const defaultTheme = computed(() => state.theme);
const data = reactive({
  chalk: '',
  theme: '',
});

const updateStyle = (style, oldCluster, newCluster) => {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
  });
  return newStyle;
};

const getCSSString = (url, variable) => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        data[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '');
        resolve(true);
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
};

const getThemeCluster = (theme) => {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(',');
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));

      red = parseInt(red.toString(16));
      green = parseInt(green.toString(16));
      blue = parseInt(blue.toString(16));

      return `#${red}${green}${blue}`;
    }
  };

  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);

    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);

    red = parseInt(red.toString(16));
    green = parseInt(green.toString(16));
    blue = parseInt(blue.toString(16));

    return `#${red}${green}${blue}`;
  };

  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
};

watch(
  () => defaultTheme.value,
  (val) => {
    data.theme = val;
  },
  { immediate: true },
);

watch(
  () => data.theme,
  async (val) => {
    const oldVal = data.chalk ? data.theme : ORIGINAL_THEME;
    if (typeof val !== 'string') return;
    const themeCluster = getThemeCluster(val.replace('#', ''));
    const originalCluster = getThemeCluster(oldVal.replace('#', ''));
    console.log(themeCluster, originalCluster);

    const $message = ElMessage.success({
      message: '  Compiling the theme',
      customClass: 'theme-message',
      type: 'success',
      duration: 0,
      iconClass: 'el-icon-loading',
    });

    const getHandler = (variable, id) => {
      return () => {
        const originalCluster = getThemeCluster(
          ORIGINAL_THEME.replace('#', ''),
        );
        const newStyle = updateStyle(
          data[variable],
          originalCluster,
          themeCluster,
        );

        let styleTag = document.getElementById(id);
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.setAttribute('id', id);
          document.head.appendChild(styleTag);
        }
        styleTag.innerText = newStyle;
      };
    };

    if (!data.chalk) {
      const url = `https://unpkg.com/element-plus@${version}/lib/theme-chalk/index.css`;
      await getCSSString(url, 'chalk');
    }

    const chalkHandler = getHandler('chalk', 'chalk-style');

    chalkHandler();

    const styles = [].slice
      .call(document.querySelectorAll('style'))
      .filter((style) => {
        const text = style.innerText;
        return (
          new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        );
      });
    styles.forEach((style) => {
      const { innerText } = style;
      if (typeof innerText !== 'string') return;
      style.innerText = updateStyle(innerText, originalCluster, themeCluster);
    });

    emit('change', val);

    $message.close();
  },
);

// export default {
//   data(val) {
//     theme.value = val;
//   },

//   methods: {

//   },
// };
</script>

<template>
  <ElColorPicker
    v-model="data.theme"
    :predefine="[
      '#409EFF',
      '#1890ff',
      '#304156',
      '#212121',
      '#11a983',
      '#13c2c2',
      '#6959CD',
      '#f5222d',
    ]"
    class="theme-picker"
    popper-class="theme-picker-dropdown"
  />
</template>

<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
