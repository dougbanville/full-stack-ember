import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  queryParams = ['prompt'];

  @tracked prompt = null;

  @tracked result = null;

  @tracked loading = false;

  @action
  async getResponse() {
    this.loading = true;
    if (!this.prompt) return null;
    const response = await fetch('/api/fancy?prompt=' + this.prompt);

    this.result = await response.json();
    this.loading = false;
  }
}
