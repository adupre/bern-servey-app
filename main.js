import { createApp, h } from 'vue'
import App from './App.vue'
import Dashboard from './Dashboard.vue'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import Toaster from '@meforma/vue-toaster';

const NotFoundComponent = { template: '<p>Page not found</p>' }

Amplify.configure(aws_exports);

const routes = {
  '/': App,
  '/dash': Dashboard
}

const SimpleRouter = {
  data: () => ({ currentRoute: window.location.pathname }),

  computed: {
    CurrentComponent() { return routes[this.currentRoute] || NotFoundComponent }
  },

  render() {
    return h(this.CurrentComponent)
  }
}

const app = createApp(SimpleRouter);
app.use(Toaster);
app.mount('#app');
