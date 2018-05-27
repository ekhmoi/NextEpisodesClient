const tintColor = '#2f95dc';

export default {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  primary: (a) => `rgba(130, 109, 255, ${a})`,
  white: (a) => `rgba(255, 255, 255, ${a})`,
  dark: (a) => `rgba(0,0,0, ${a})`
};
