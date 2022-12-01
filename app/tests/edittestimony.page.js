import { Selector } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class EditTestimonyPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.EDIT_TESTIMONY}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that the current page has at least 1 card on it.  */
  async hasDefaultFields(testController) {
    const cardCount = Selector('.card').count;
    await testController.expect(cardCount).gte(1);
  }

  /** Checks that you can edit testimony  */
  async editTestimony(testController) {
    await testController.click(Selector('a').withText('Edit'));
  }
}

export const editTestimonyPage = new EditTestimonyPage();
