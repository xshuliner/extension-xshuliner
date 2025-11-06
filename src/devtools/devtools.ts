import browser from 'webextension-polyfill';

// 创建 devtools 面板
browser.devtools.panels.create(
  'Xshuliner',
  'icons/icon.png',
  'src/devtools/index.html'
).then((panel) => {
  console.log('DevTools panel created:', panel);
}).catch((error) => {
  console.error('Error creating DevTools panel:', error);
});

