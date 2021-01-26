function hasShare() {
  return !!navigator.share;
}
function share(shareData: any) {
  if (navigator.share) {
    navigator.share(shareData)
  }
}
const exports = { hasShare, share };
export default (_context: any, inject: any) => {
  inject('util', exports);
}
