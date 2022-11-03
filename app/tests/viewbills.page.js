import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { viewBillPage } from './simple.page';

class SubmitTestimonyPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.VIEW_BILLS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks that when a bill is clicked on it navigates from ViewBills to ViewBill. */
  async checkNavigation() {
    await t.click('#inactive-bills');
    await t.click('#view-bill-link');
    await viewBillPage.isDisplayed();
  }
}
