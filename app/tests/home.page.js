import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { HOMEPAGE_IDS } from '../imports/ui/utilities/HomePageIDs';
import { navBar } from './navbar.component';

class HomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists || Selector(`#${PAGE_IDS.HOME_MOBILE}`).exists).ok();
  }

  async hearingsButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.HEARINGS_BUTTON}`).visible;
    if (!visible) {
      await navBar.gotoHomePage();
    }
    await t.click(`#${HOMEPAGE_IDS.HEARINGS_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.VIEW_HEARINGS}`).exists).ok();
    await navBar.gotoHomePage();
  }

  async measuresButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.MEASURES_BUTTON}`).visible;
    if (!visible) {
      await navBar.gotoHomePage();
    }
    await t.click(`#${HOMEPAGE_IDS.MEASURES_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.VIEW_BILLS}`).exists).ok();
    await navBar.gotoHomePage();
  }

  async submitTestimonyButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.SUBMIT_TESTIMONY_BUTTON}`).visible;
    if (!visible) {
      await navBar.gotoHomePage();
    }
    await t.click(`#${HOMEPAGE_IDS.SUBMIT_TESTIMONY_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.SUBMIT_TESTIMONY}`).exists).ok();
    await navBar.gotoHomePage();
  }

  async calendarButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.CALENDAR_BUTTON}`).visible;
    if (!visible) {
      await navBar.gotoHomePage();
    }
    await t.click(`#${HOMEPAGE_IDS.CALENDAR_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.CALENDAR}`).exists).ok();
    await navBar.gotoHomePage();
  }

  async switchToMobileView() {
    const visible = await Selector(`#${PAGE_IDS.HOME}`).visible;
    if (!visible) {
      await navBar.gotoHomePage();
    }
    await t.resizeWindow(700, 1000);
    await t.expect(Selector(`#${PAGE_IDS.HOME_MOBILE}`).exists).ok();
  }

  async resetToRegularView() {
    const visible = await Selector(`#${PAGE_IDS.HOME_MOBILE}`).visible;
    const visible1 = await this.pageId.visible;
    if (!(visible || visible1)) {
      await navBar.gotoHomePage();
    }
    if (visible) {
      await t.maximizeWindow();
    }
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const homePage = new HomePage();
