import HomeScreen from "../../HomeScreen";
import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";

const props = {
  navigation: {
    navigate: jest.fn(),
  } as any,
};

const feature = loadFeature(
  "./src/pages/BoilerplatePages/__tests__/features/Homescreen.feature"
);

defineFeature(feature, (test) => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    let HomePageWrapper: ShallowWrapper;
    let instance: HomeScreen;

    given("I am on the Home Page", () => {
      HomePageWrapper = shallow(<HomeScreen {...props} />);
    });

    when("I successfully load Home Page", async () => {
      instance = HomePageWrapper.instance() as HomeScreen;
    });

    then("I should see Hello World", () => {
      const helloWorldText = HomePageWrapper.find(
        '[data-test-id="hello-text"]'
      );

      expect(helloWorldText).toBeDefined();
    });
  });
});
