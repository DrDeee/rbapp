export default (context: any, inject: any) => {
  inject('isAdmin', () => {
    return context.$auth.user?.groups.includes("/OG Amrum");
  });
}
