import { Selector } from 'testcafe';
import { PageIDs } from '../imports/ui/utilities/ids';

class SubmitTestimonyPage {
  constructor() {
    this.pageId = `#${PageIDs.SUBMIT_TESTIMONY}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least nine interests on it.  */
  async hasDefaultFields(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }
}

export const submitTestimonyPage = new SubmitTestimonyPage();
