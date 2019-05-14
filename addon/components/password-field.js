import TextField from './text-field';

export default TextField.extend({
  type: 'password',
  icon: 'eye',

  actions: {
    handleIconClick() {
      this.set('type', 'text');
    }
  }
});
