import { widget } from "../src/widgets";
/*
function Construct ()
{
    return new widget();
}

describe('Construct widget', () => {
    expect(Construct());
});

describe('Construct button', () => {
    const widget = Construct();

    expect(widget.createButton("Button01", {callback: () => {console.log("button clicked");}}));
});

describe('click button', () => {
    const widget = Construct();
    const button = widget.createButton("Button01", {callback: () => {console.log("button clicked");}});
    expect(button.click());
});

describe('Construct searchbox', () => {
    const widget = Construct();

    expect(widget.createSearchBox("Searchbox01", {callback: () => {console.log("searchbox clicked");}, placeholder: "type to search"}));
});

describe('setValue searchbox', () => {
    const widget = Construct();
    const searchbox = widget.createSearchBox("Searchbox01", {callback: () => {console.log("searchbox clicked");}, placeholder: "type to search"});
    expect(searchbox.setValue("busqueda genérica"));
});

describe('getValue searchbox', () => {
    const widget = Construct();
    const searchbox = widget.createSearchBox("Searchbox01", {callback: () => {console.log("searchbox clicked");}, placeholder: "type to search"});
    searchbox.setValue("busqueda genérica");
    expect(searchbox.getValue()).toBe("busqueda genérica");
});

describe('Construct ContextMenu', () => {
    const widget = Construct();
    const values = ["Valor1", "Valor2", "Valor3"];
    const options = {title: "Titulo genérico"};
    expect(widget.createContextMenu(values, options));
});

describe('close ContextMenu', () => {
    const widget = Construct();
    const values = ["Valor1", "Valor2", "Valor3"];
    const options = {title: "Titulo genérico"};
    const context = widget.createContextMenu(values, options);
    expect(context.close(undefined, false));
});

describe('getTopMenu ContextMenu', () => {
    const widget = Construct();
    const values = ["Valor1", "Valor2", "Valor3"];
    const options = {title: "Titulo genérico"};
    const context = widget.createContextMenu(values, options);
    expect(context.getTopMenu());
});

describe('getFirstEvent ContextMenu', () => {
    const widget = Construct();
    const values = ["Valor1", "Valor2", "Valor3"];
    const options = {title: "Titulo genérico"};
    const context = widget.createContextMenu(values, options);
    expect(context.getFirstEvent());
});

describe('createCheckbox Checkbox', () => {
    const widget = Construct();

    expect(widget.createCheckbox(false, () => {console.log("checkbox changed")}));
});

describe('setValue Checkbox', () => {
    const widget = Construct();

    const check = widget.createCheckbox(false, () => {console.log("checkbox changed")});
    expect(check.setValue(true));
});

describe('getValue Checkbox', () => {
    const widget = Construct();

    const check = widget.createCheckbox(false, () => {console.log("checkbox changed")});
    expect(check.getValue());
});

describe('onClick Checkbox', () => {
    const widget = Construct();

    const check = widget.createCheckbox(false, () => {console.log("checkbox changed")});
    expect(check.onClick({}));
});

describe('createCheckbox litebox', () => {
    const widget = Construct();

    expect(widget.createLitebox(true, () => {console.log("litebox changed")}));
});

describe('setValue litebox', () => {
    const widget = Construct();

    const litebox = widget.createLitebox(true, () => {console.log("litebox changed")});
    expect(litebox.setValue(true));
});

describe('getElement litebox', () => {
    const widget = Construct();

    const litebox = widget.createLitebox(true, () => {console.log("litebox changed")});
    expect(litebox.getElement()).toBeDefined();
});

describe('Construct List', () => {
    const widget = Construct();
    interface item{
        name,
        title,
        id
    }

    const items: item[] = [
        {name: "Pos0", title: "Title0", id: 0},
        {name: "Pos1", title: "Title1", id: 1},
        {name: "Pos2", title: "Title2", id: 2},
        {name: "Pos3", title: "Title3", id: 3},
    ];
    expect(widget.createList("List01", items, {callback: () => {console.log("litebox changed")}, parent: widget}));
});

describe('getSelectedItem List', () => {
    const widget = Construct();
    interface item{
        name,
        title,
        id
    }

    const items: item[] = [
        {name: "Pos0", title: "Title0", id: 0},
        {name: "Pos1", title: "Title1", id: 1},
        {name: "Pos2", title: "Title2", id: 2},
        {name: "Pos3", title: "Title3", id: 3},
    ];
    const list = widget.createList("List01", items, {callback: () => {console.log("litebox changed")}, parent: widget});
    expect(list.getSelectedItem());
});

describe('setSelectedItem List', () => {
    const widget = Construct();
    interface item{
        name,
        title,
        id
    }

    const items: item[] = [
        {name: "Pos0", title: "Title0", id: 0},
        {name: "Pos1", title: "Title1", id: 1},
        {name: "Pos2", title: "Title2", id: 2},
        {name: "Pos3", title: "Title3", id: 3},
    ];
    const list = widget.createList("List01", items, {callback: () => {console.log("litebox changed")}, parent: widget});
    expect(list.setSelectedItem("Pos1"));
});

describe('Construct Slider', () => {
    const widget = Construct();

    expect(widget.createSlider(0.3, {min: 0, max: 1}));
});

describe('setFromX Slider', () => {
    const widget = Construct();

    const slider = widget.createSlider(0.3, {min: 0, max: 1});
    expect(slider.setFromX(1));
});

describe('onMouseMove Slider', () => {
    const widget = Construct();

    const slider = widget.createSlider(0.3, {min: 0, max: 1});
    expect(slider.onMouseMove({e: 1}));
});

describe('onMouseUp Slider', () => {
    const widget = Construct();

    const slider = widget.createSlider(0.3, {min: 0, max: 1});
    expect(slider.onMouseUp({e: 1}));
});

describe('setValue Slider', () => {
    const widget = Construct();

    const slider = widget.createSlider(0.3, {min: 0, max: 1});
    expect(slider.setValue(0.3, false));
});

describe('Construct LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    expect(widget.createLineEditor(0.3, {valuesArray}));
});

describe('getValueAt LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    expect(lineEditor.getValueAt(0.5));
});

describe('resample LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    expect(lineEditor.resample(4));
});

describe('addValue LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    expect(lineEditor.addValue([300,300]));
});

describe('convert LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    expect(lineEditor.convert([300,300]));
});

describe('unconvert LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    expect(lineEditor.unconvert([300,300]));
});

describe('redraw LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    lineEditor.redraw();
    lineEditor.addValue([300,300]);
    expect(lineEditor.redraw());
});

describe('onmousedown LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0
      });
    expect(lineEditor.onmousedown(evt));
});

describe('onmousemove LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0
      });
    expect(lineEditor.onmousemove(evt));
});

describe('onmouseup LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});
    const evt = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
        clientX: 0,
        clientY: 0
      });
    expect(lineEditor.onmouseup(evt));
});

describe('onresize LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});

    expect(lineEditor.onresize({}));
});

describe('onchange LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});

    expect(lineEditor.onchange());
});

describe('distance LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});

    expect(lineEditor.distance(valuesArray[1], valuesArray[2]));
});

describe('computeSelected LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});

    expect(lineEditor.computeSelected(0, 0));
});

describe('sortValues LineEditor', () => {
    const widget = Construct();
    const valuesArray = [[0,0], [50,50], [100,100], [200,200]];
    const lineEditor = widget.createLineEditor(0.3, {valuesArray});

    expect(lineEditor.sortValues());
});

describe('Construct ComplexList', () => {
    const widget = Construct();
    expect(widget.createComplexList({height: 50}));
});

describe('Construct ComplexList', () => {
    const widget = Construct();
    const list = widget.createComplexList({height: 50});
    expect(list.addTitle("Titulo de lista"));
});

describe('addHTML ComplexList', () => {
    const widget = Construct();
    const list = widget.createComplexList({height: 50});
    const callableFunction: CallableFunction = () => {console.log("aditional list clicked")};
    expect(list.addHTML("aditional list", callableFunction));
});

describe('clear ComplexList', () => {
    const widget = Construct();
    const list = widget.createComplexList({height: 50});
    expect(list.clear());
});

describe('addItem ComplexList', () => {
    const widget = Construct();
    const list = widget.createComplexList({height: 50});
    const item = document.createElement("div") as HTMLDivElement;
    expect(list.addItem(item, "item generico", true, true));
});
*/