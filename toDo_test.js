const assert = require("chai").assert;

Feature("Tests for EPAM main page");

Scenario(
  "Verify that opened page contains logo and copyright (at the end of page)",
  ({ I }) => {
    I.amOnPage("https://www.epam.com/");
    I.seeElement(".header__logo");
    I.scrollTo("footer");
    I.see("© 2023 EPAM Systems, Inc.", "footer");
  }
);

Scenario(
  'Verify that main menu contains following items: Services, Industries, Insights, About, Careers click on "Contact US"',
  async ({ I }) => {
    I.amOnPage("https://www.epam.com/");
    I.see("Services", "a.top-navigation__item-link");
    I.see("Industries", "a.top-navigation__item-link");
    I.see("Insights", "a.top-navigation__item-link");
    I.see("About", "a.top-navigation__item-link");
    I.see("Careers", "a.top-navigation__item-link");
    I.waitForElement(
      '[class="cta-button-ui cta-button-ui-23 header__control"]'
    );
    I.click('[class="cta-button-ui cta-button-ui-23 header__control"]');
  }
);

Scenario(
  "Verify that list of phones numbers not empty and all numbers are in needed format +d-ddd-ddd-dddd",
  async ({ I }) => {
    I.amOnPage("https://www.epam.com/about/who-we-are/contact");
    const phoneNumbers = await I.grabTextFromAll(
      'div > [class="scaling-of-text-wrapper"]:nth-child(2)'
    );
    assert.isNotEmpty(phoneNumbers, "Phone numbers list is empty");
    const numbersArray = phoneNumbers.join("\n").split("\n");
    for (const phoneNumber of numbersArray) {
      const formattedPhoneNumber = phoneNumber.replace(/[^+\d-]/g, "");
      assert.match(
        formattedPhoneNumber,
        /^\+\d-\d{3}-\d{3}-\d{4}$/,
        `Phone number "${phoneNumber}" does not match the format +d-ddd-ddd-dddd`
      );
    }
  }
);
