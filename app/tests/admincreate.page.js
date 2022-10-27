import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class AdmincreatePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_CREATE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const admincreatePage = new AdmincreatePage();
