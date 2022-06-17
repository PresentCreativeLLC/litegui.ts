import { Tabs } from "../src/tabs";
import { HTMLLIElementPlus } from "../src/@types/globals/index"
/*
function Construct (options: any, legacy: boolean)
{
    return new Tabs(options, legacy);
}

describe("Test de creacion de tab", () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    it(`Debería resultar ${5}`, () =>{
        expect(Construct(options, false)).toBeDefined();
    });
});

describe('Mouse wheel', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);
    const mouseSimulation = { deltaY: 3.5 };
    expect(tab.onMouseWheel(mouseSimulation));
});

describe('Show', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);
    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.show());
});

describe('Hide', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);
    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.hide());
});

describe('selectTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.selectTab("tab02", false));
});

describe('getCurrentTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    tab.selectTab("tab02", false);
    expect(tab.getCurrentTab());
});

describe('getCurrentTabId', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    tab.selectTab("tab02", false);
    expect(tab.getCurrentTabId());
});

describe('getPreviousTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    tab.selectTab("tab02", false);
    tab.selectTab("tab02", false);
    expect(tab.getPreviousTab());
});

describe('appendTo', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    options.id = "tab03";
    options.callback = function () {console.log("Tab03 is being clicked")};
    const tab2 = Construct(options, false);
    expect(tab.appendTo(tab2.root));
});

describe('getTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.getTab("tab02"));
});

describe('getTabByIndex', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.getTabByIndex(0));
});

describe('getNumOfTabs', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.getNumOfTabs()).toBe(1);
});

describe('getTabContent', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.getTabContent("tab02"));
});

describe('getTabIndex', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.getTabIndex("tab02"));
});

describe('addTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    expect(tab.addTab("tab02", options2));
});

describe('addPlusTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const callback: Function = function () {console.log("Tab is being clicked")};
    expect(tab.addPlusTab(callback));
});

describe('addButtonTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const callback: Function = function () {console.log("Tab is being clicked")};
    expect(tab.addButtonTab("tab02", "titulo", callback));
});

describe('onTabClicked', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const element: HTMLLIElementPlus = document.createElement("li") as HTMLLIElementPlus;
    element.selected = false;

    expect(tab.onTabClicked(true, element));
});

describe('setTabVisibility', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    expect(tab.setTabVisibility("tab01", true));
});

describe('recomputeTabsByIndex', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    expect(tab.recomputeTabsByIndex());
});

describe('removeTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.removeTab("tab02"));
});

describe('removeAllTabs', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.removeAllTabs());
});

describe('clear', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.clear());
});

describe('hideTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    expect(tab.hideTab("tab02"));
});

describe('showTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    const options2 = { callback: function () {console.log("Tab is being clicked")}, title: "Este es el titulo",
    button: true, closable: true, tab_width: 120, id: "tab02", size: "full", width: 120, height: 50, selected: true}
    tab.addTab("tab02", options2);
    tab.hideTab("tab02");
    expect(tab.showTab("tab02"));
});

describe('transferTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    options.id = "tab02";
    options.callback = function () {console.log("Tab02 is being clicked")};
    const tab2 = Construct(options, false);

    expect(tab.transferTab("tab01", tab2));
});

describe('detachTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    expect(tab.detachTab("tab01", function () {console.log("Tab complete")},
        function () {console.log("Tab on close")}));
});

describe('detadestroychTab', () => {
    const options = { mode: "horizontal", id: "tab01", size: "full", width: 120, height: 50,
        callback: function () {console.log("Tab is being clicked")}};
    const tab = Construct(options, false);

    expect(tab.destroy("tab01"));
});
*/