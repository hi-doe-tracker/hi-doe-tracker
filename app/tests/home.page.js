import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';
import { COMPONENT_IDS } from '../imports/ui/utilities/ComponentIDs';
import { HOMEPAGE_IDS } from '../imports/ui/utilities/HomePageIDs';

class HomePage {
  constructor() {
    this.pageId = `#${PAGE_IDS.HOME}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }

  async hearingsButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.HEARINGS_BUTTON}`).visible;
    if (!visible) {
      await t.click(`${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
    }
    await t.click(`#${HOMEPAGE_IDS.HEARINGS_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.VIEW_HEARINGS}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

  async measuresButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.MEASURES_BUTTON}`).visible;
    if (!visible) {
      await t.click(`${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
    }
    await t.click(`#${HOMEPAGE_IDS.MEASURES_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.VIEW_BILLS}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

  async submitTestimonyButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.SUBMIT_TESTIMONY_BUTTON}`).visible;
    if (!visible) {
      await t.click(`${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
    }
    await t.click(`#${HOMEPAGE_IDS.SUBMIT_TESTIMONY_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.SUBMIT_TESTIMONY}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

  async calendarButtonWorks() {
    const visible = await Selector(`#${HOMEPAGE_IDS.CALENDAR_BUTTON}`).visible;
    if (!visible) {
      await t.click(`${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
    }
    await t.click(`#${HOMEPAGE_IDS.CALENDAR_BUTTON}`);
    await t.expect(Selector(`#${PAGE_IDS.CALENDAR}`).exists).ok();
    await t.click(`#${COMPONENT_IDS.NAVBAR_HOME_PAGE}`);
  }

}

export const homePage = new HomePage();
