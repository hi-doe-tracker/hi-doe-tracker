import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

/** Create an instance of a SimplePage when all you need to do is verify that the page was displayed. */
class SimplePage {
  constructor(id) {
    this.pageId = `#${id}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed() {
    // From https://testcafe.io/documentation/402803/recipes/best-practices/create-helpers
    // Note that this file imports t (the test controller) from the testcafe module. You don’t need to pass t to helper functions because TestCafe can resolve the current test context and provide the correct test controller instance.
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const viewBillsPage = new SimplePage(PAGE_IDS.VIEW_BILLS);
export const viewBillPage = new SimplePage(PAGE_IDS.VIEW_BILL);
export const sendHearingNoticePage = new SimplePage(PAGE_IDS.SEND_HEARING_NOTICE);
export const viewHearingsPage = new SimplePage(PAGE_IDS.VIEW_HEARINGS);
export const simpleSubmitTestimonyPage = new SimplePage(PAGE_IDS.SUBMIT_TESTIMONY);
export const listTestimonyPage = new SimplePage(PAGE_IDS.LIST_TESTIMONY);
export const createAccountPage = new SimplePage(PAGE_IDS.ADMIN_CREATE);
export const assignBillPage = new SimplePage(PAGE_IDS.ASSIGN_BILL);
export const manageAccountsPage = new SimplePage(PAGE_IDS.MANAGE_ACCOUNTS);
export const signOutPage = new SimplePage(PAGE_IDS.SIGN_OUT);
