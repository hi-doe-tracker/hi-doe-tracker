import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';

class HomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async measureButtonWorks() {
    const visible = await Selector('Hearings').visible;
    if (!visible) {
      await t.click(`${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
    }
    await t.expect(Selector(`#${PAGE_IDS.VIEW_HEARINGS}`).visible).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

}

export const homePage = new HomePage();
