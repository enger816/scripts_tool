/**
 * tsc自动监听增量编译
 * npm tsc-watch
 */
var TscWatchClient = require('tsc-watch/client');
var watch = new TscWatchClient();
 
watch.on('first_success', () => {
  console.log('First success!');
});
 
watch.on('success', () => {
  // Your code goes here...
});
 
watch.on('compile_errors', () => {
  // Your code goes here...
});
 
watch.start('--project', '.');
 
try {
  // do something...
  console.log("编译完了干点事情！");
} catch (e) {
  console.log("Fatal error, kill the compiler instance");
  watch.kill(); // Fatal error, kill the compiler instance.
}