Feature: Home Page

  Scenario: Render Pokemon List
    Given I am on the Home Page
    When I successfully load Home Page
    Then I should see a search bar and Pokemon list
    Then I should see the loading indicator when loading
    Then I should see the Pokemon list when not loading
