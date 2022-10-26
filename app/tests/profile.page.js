import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class ProfilePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.PROFILE}`;
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async changePassword(newpass) {
    await t.click(Selector('button').withText('Change Password'));
    const password = Selector('#newpassword');
    await t.typeText(password, newpass);
    await t.typeText(Selector('#confirmpassword'), newpass);
    await t.click(Selector('button').withText('Save Changes'));
    await t.click(Selector('button').withText('OK'));
  }
}

export const profilePage = new ProfilePage();
