import { Selector, t } from 'testcafe';
import { PAGE_IDS } from '../imports/ui/utilities/PageIDs';

class CalendarPage {
  constructor() {
    this.pageId = `#${PAGE_IDS.CALENDAR}`;
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed() {
    await t.expect(this.pageSelector.exists).ok();
  }
}

export const calendarPage = new CalendarPage();
