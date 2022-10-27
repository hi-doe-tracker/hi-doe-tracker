import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class AdminManageAccountsPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.ADMIN_MANAGE_ACCOUNTS}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  /** Signs up a new user, then checks to see if it is created by logging out then into that new account. */
  async deleteUser(testController) {
    const lastButton = Selector('Button').nth(-1);
    await t.click(lastButton);
    await t.click(Selector('.swal-button--confirm'));
    await t.click(Selector('.swal-button--confirm'));
  }
}

export const adminManageAccountsPage = new AdminManageAccountsPage();