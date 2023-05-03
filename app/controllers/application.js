import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  queryParams = ['prompt'];

  @tracked prompt = null;
  @tracked name = 'Fred West';
  @tracked personality = 'An Irish traveler';
  @tracked offerAmount = 5;

  @tracked result = null;

  @tracked loading = false;

  @action
  async getResponse() {
    this.loading = true;
    if (!this.prompt) return null;
    const response = await fetch(
      `/api/quibble?name=${this.name}&personality=${this.personality}&offerAmount=${this.offerAmount}`,
    );

    this.result = await response.json();
    this.loading = false;
  }
}
