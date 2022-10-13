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

  async pressChangeProfileButton() {
    await t.click(Selector('button').withText('Edit profile'));
  }

  async isChangeProfileDisplayed() {
    await Selector('button').withText('Save Changes').exists;
  }

}

export const profilePage = new ProfilePage();
