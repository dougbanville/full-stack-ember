import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return fetch('/api/hello')
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
  }
}
