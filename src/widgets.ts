import { LiteGUI } from "./core";
import { HTMLDivElementPlus, HTMLSpanElementPlus, EventTargetPlus, HTMLLIElementPlus } from "./@types/globals/index"
// Enclose in a scope
export class widget {

	constructor()
	{
		/*
		 *LiteGUI.Button = this.Button;
		 *LiteGUI.SearchBox = this.SearchBox;
		 *LiteGUI.ContextMenu = this.ContextMenu;
		 *LiteGUI.ContextualMenu = this.ContextMenu; // LEGACY: REMOVE
		 *LiteGUI.Checkbox = this.Checkbox;
		 *LiteGUI.createLitebox = this.createLitebox;
		 *LiteGUI.List = this.List;
		 *LiteGUI.Slider = this.Slider;
		 *LiteGUI.LineEditor = this.LineEditor;
		 *LiteGUI.ComplexList = this.ComplexList;
		 */
	}

	createButton(value: string, options: any)
	{
		return new Button(value, options);
	}
	createSearchBox(value: string, options: any)
	{
		return new SearchBox(value, options);
	}
	createContextMenu(valuesArray: any[], options: any)
	{
		return new ContextMenu(valuesArray, options);
	}
	createCheckbox(value: boolean, on_change: CallableFunction)
	{
		return new Checkbox(value, on_change);
	}
	createLitebox(state: boolean, on_change: CallableFunction)
	{
		return new Litebox(state, on_change);
	}
	createList(id: string, items: any[], options: any)
	{
		return new List(id, items, options);
	}
	createSlider(value: number, options: any)
	{
		return new Slider(value, options);
	}
	createLineEditor(valuesArray: any, options: any)
	{
		return new LineEditor(valuesArray, options);
	}
	createComplexList(valuesArray: any[], options: any)
	{
		return new ComplexList(options);
	}
}

class Button
{
	root: HTMLDivElement;
	content: HTMLButtonElement;
	callback?: Function;
	constructor(value: string, options: any) {
		options = options || {};

		if (typeof (options) === "function") { options = { callback: options }; }

		// "thas" is equal to "this", so this doesnt make sense const that: ThisType<Window> = this;
		const element = document.createElement("div") as HTMLDivElement;
		element.className = "litegui button";

		this.root = element;
		const button = document.createElement("button");
		button.className = "litebutton";
		this.content = button;
		element.appendChild(button);

		button.innerHTML = value;
		button.addEventListener("click", (e) => {
			this.click();
		});

		if (options.callback) { this.callback = options.callback; }
	}

	click()
	{
		if (this.callback) { this.callback.call(this); }		
	}
}

/**
	 * SearchBox
	 *
	 * @class SearchBox
	 * @constructor
	 * @param {*} value
	 * @param {Object} options
	 */

class SearchBox
{
	root: HTMLDivElement;
	options: any;
	value: string;
	input: HTMLInputElement;
	constructor(value: string, options: any)
	{
		this.options = options || {};
		this.value = value || "";
		const element = document.createElement("div") as HTMLDivElement;
		element.className = "litegui searchbox";
		const placeholder = (options.placeholder != null ? options.placeholder : "Search");
		element.innerHTML = "<input value='" + value + "' placeholder='" + placeholder + "'/>";
		this.input = element.querySelector("input")!;
		this.root = element;
	
		this.input.onchange = function (e: any) {
			const value = e.target.value;
			if (options.callback) { options.callback.call(this, value); }
		};
	}

	setValue(v: string)
	{
		this.input.value = v; 
		if (this.input.onchange) { this.input.onchange(new Event("change")); }
	}

	getValue()
	{
		return this.input.value;
	}
}

/**
	* ContextMenu
	*
	* @class ContextMenu
	* @constructor
	* @param {Array} values (allows object { title: "Nice text", callback: function ... })
	* @param {Object} options [optional] Some options:\
	* - title: title to show on top of the menu
	* - callback: function to call when an option is clicked, it receives the item information
	* - ignore_item_callbacks: ignores the callback inside the item, it just calls the options.callback
	* - event: you can pass a MouseEvent, this way the ContextMenu appears in that position
	*/
export class ContextMenu
{
	root: HTMLDivElementPlus;
	options: any;
	parentMenu: any;
	lock?: boolean;
	current_submenu: any;
	constructor(values: any[], options: any)
	{
		options = options || {};
		this.options = options;

		// To link a menu with its parent
		if (options.parentMenu) {
			if (options.parentMenu.constructor !== this.constructor) {
				console.error("parentMenu must be of class ContextMenu, ignoring it");
				options.parentMenu = null;
			}
			else {
				this.parentMenu = options.parentMenu;
				this.parentMenu.lock = true;
				this.parentMenu.current_submenu = this;
			}
		}

		if (options.event && options.event.constructor.name !== "MouseEvent" && options.event.constructor.name !== "PointerEvent" && options.event.constructor.name !== "CustomEvent") {
			console.error("Event passed to ContextMenu is not of type MouseEvent or CustomEvent. Ignoring it.");
			options.event = null;
		}

		const root = document.createElement("div") as HTMLDivElementPlus;
		root.className = "litecontextmenu litemenubar-panel";
		root.style.minWidth = "100";
		root.style.minHeight = "100";
		root.style.pointerEvents = "none";
		setTimeout(() => { root.style.pointerEvents = "auto"; }, 100); // Delay so the mouse up event is not caugh by this element

		// This prevents the default context browser menu to open in case this menu was created when pressing right button
		root.addEventListener("mouseup", (e: MouseEvent) => {
			e.preventDefault(); return true;
		}, true);
		root.addEventListener("contextmenu", (e: MouseEvent) => {
			if (e.button != 2) // Right button
			{ return false; }
			e.preventDefault();
			return false;
		}, true);

		root.addEventListener("mousedown", (e: MouseEvent) => {
			if (e.button == 2) {
				this.close.bind(this, e);
				e.preventDefault();
				return true;
			}
			return false;
		}, true);


		this.root = root;

		// Title
		if (options.title) {
			const element = document.createElement("div") as HTMLDivElementPlus;
			element.className = "litemenu-title";
			element.innerHTML = options.title;
			root.appendChild(element);
		}

		// Entries
		let num = 0;
		for (const i in values) {
			let name = values.constructor == Array ? values[i] : i;
			if (name != null && name.constructor !== String) { name = name.content === undefined ? String(name) : name.content; }
			const value = values[i];
			this.addItem(name, value, options);
			num++;
		}

		// Close on leave
		root.addEventListener("mouseleave", (e) => {
			if (this.lock || !this.root) { return; }
			if (this.root.closingTimer) { clearTimeout(this.root.closingTimer); }
			this.root.closingTimer = setTimeout(this.close.bind(this, e), 500);
			// That.close(e);
		});

		root.addEventListener("mouseenter", (e) => {
			if (root.closingTimer) { clearTimeout(root.closingTimer); }
		});

		function on_mouse_wheel(e: any) {
			const pos = parseInt(root.style.top);
			root.style.top = (pos + e.deltaY * 0.1).toFixed() + "px";
			e.preventDefault();
			return true;
		}

		root.addEventListener("wheel", on_mouse_wheel, true);
		root.addEventListener("mousewheel", on_mouse_wheel, true);


		// Insert before checking position
		let root_document = document;
		if (options.event) { root_document = options.event.target.ownerDocument; }

		if (!root_document) { root_document = document; }
		root_document.body.appendChild(root);

		// Compute best position
		let left = options.left || 0;
		let top = options.top || 0;
		if (options.event) {
			if (options.event.constructor.name !== "MouseEvent" && options.event.constructor.name !== "PointerEvent" && options.event.constructor.name !== "CustomEvent") {
				console.warn("Event passed to ContextMenu is not of type MouseEvent");
				options.event = null;
			}
			else {
				left = (options.event.pageX - 10);
				top = (options.event.pageY - 10);
				if (options.title) { top -= 20; }

				if (options.parentMenu) {
					const rect = options.parentMenu.root.getBoundingClientRect();
					left = rect.left + rect.width;
				}

				const body_rect = document.body.getBoundingClientRect();
				const root_rect = root.getBoundingClientRect();

				if (left > (body_rect.width - root_rect.width - 10)) { left = (body_rect.width - root_rect.width - 10); }
				if (top > (body_rect.height - root_rect.height - 10)) { top = (body_rect.height - root_rect.height - 10); }
			}
		}

		root.style.left = left + "px";
		root.style.top = top + "px";
	}

	close(e: any, ignore_parent_menu: boolean) {
		if (this.root.parentNode) { this.root.parentNode.removeChild(this.root); }
		if (this.parentMenu && !ignore_parent_menu) {
			this.parentMenu.lock = false;
			this.parentMenu.current_submenu = null;
			if (e === undefined) { this.parentMenu.close(); }
			else if (e && !LiteGUI.isCursorOverElement(e, this.parentMenu.root)) { LiteGUI.trigger(this.parentMenu.root, "mouseleave", e); }
		}
		if (this.current_submenu) { this.current_submenu.close(e, true); }
		if (this.root.closingTimer) { clearTimeout(this.root.closingTimer); }
	};

	// Returns the top most menu
	getTopMenu() {
		if (this.options.parentMenu) { return this.options.parentMenu.getTopMenu(); }
		return this;
	}

	getFirstEvent() {
		if (this.options.parentMenu) { return this.options.parentMenu.getFirstEvent(); }
		return this.options.event;
	}

	addItem(name: string, value: any, options: any) {
		const that = this;
		options = options || {};

		const element = document.createElement("div") as HTMLDivElementPlus;
		element.className = "litemenu-entry submenu";

		let disabled = false;

		if (value === null) {
			element.classList.add("separator");
			/*
			 * Element.innerHTML = "<hr/>"
			 * continue;
			 */
		}
		else {
			element.innerHTML = value && value.title ? value.title : name;
			element.value = value;

			if (value) {
				if (value.disabled) {
					disabled = true;
					element.classList.add("disabled");
				}
				if (value.submenu || value.has_submenu) { element.classList.add("has_submenu"); }
			}

			if (typeof (value) == "function") {
				element.dataset["value"] = name;
				element.onclick = value;
			}
			else { element.dataset["value"] = value; }
		}

		this.root.appendChild(element);

		// Menu option clicked
		const inner_onclick = function (e: any) {
			const el = e.target;
			const value = el.value;
			let close_parent = true;

			if (that.current_submenu) {
				that.current_submenu.close(e);
			}

			// global callback
			if (options.callback) {
				const r = options.callback.call(that, value, options, e);
				if (r === true) { close_parent = false; }
			}

			// Special cases
			if (value) {
				if (value.callback && !options.ignore_item_callbacks && value.disabled !== true)  // Item callback
				{
					const r = value.callback.call(el, value, options, e, that);
					if (r === true) { close_parent = false; }
				}
				if (value.submenu) {
					if (!value.submenu.options) {
						throw ("ContextMenu submenu needs options");
					}
					const submenu = LiteGUI.ContextMenu(value.submenu.options, {
						callback: value.submenu.callback,
						event: e,
						parentMenu: that,
						ignore_item_callbacks: value.submenu.ignore_item_callbacks,
						title: value.submenu.title,
						autoopen: options.autoopen
					});
					close_parent = false;
				}
			}

			if (close_parent && !that.lock) { that.close(e, true); }
		};
		const inner_over = function (e: any) {
			const el = e.target;
			const value = el.value;
			if (!value || !value.has_submenu) { return; }
			inner_onclick.call(el, e);
		};

		if (!disabled) {
			element.addEventListener("click", inner_onclick.bind(element));
		}
		if (options.autoopen) {
			element.addEventListener("mouseenter", inner_over.bind(element));
		}

		return element;
	}
}

class Checkbox
{
	root: HTMLSpanElementPlus;
	value: boolean;
	element?: HTMLSpanElementPlus;
	onChange: CallableFunction

	constructor(value: boolean, on_change: CallableFunction)
	{
		this.value = value;

		const root = this.root = document.createElement("span") as HTMLSpanElementPlus;
		root.className = "litecheckbox inputfield";
		root.dataset["value"] = value.toString();

		const element = this.element = document.createElement("span") as HTMLSpanElementPlus;
		element.className = "fixed flag checkbox " + (value ? "on" : "off");
		root.appendChild(element);
		root.addEventListener("click", this.onClick);
		this.onChange = on_change;
	}

	setValue(v: boolean)
	{
		if (this.value === v || !this.root || !this.element) { return; }

		if (this.root.dataset["value"] == v.toString()) { return; }

		this.root.dataset["value"] = v.toString();
		if (v) {
			this.element.classList.remove("off");
			this.element.classList.add("on");
		}
		else {
			this.element.classList.remove("on");
			this.element.classList.add("off");
		}
		const old_value = this.value;
		this.value = v;

		this.onChange(v, old_value);
	}

	getValue()
	{
		return this.root.dataset["value"] == "true";
	}

	onClick(e: any)
	{
		this.setValue(this.root.dataset["value"] != "true");
		e.preventDefault();
		e.stopPropagation();
	}
}


// The tiny box to expand the children of a node
class Litebox
{
	element: HTMLSpanElementPlus;

	constructor(state: boolean, on_change: CallableFunction)
	{
		const element = document.createElement("span") as HTMLSpanElementPlus;
		this.element = element;
		element.className = "listbox " + (state ? "listopen" : "listclosed");
		element.innerHTML = state ? "&#9660;" : "&#9658;";
		element.dataset["value"] = state ? "open" : "closed";

		element.onclick = function (e: MouseEvent) {
			const box = e.target as EventTargetPlus;
			box?.setValue(element.dataset["value"] == "open" ? false : true);
			// if (this.stopPropagation) {e.stopPropagation();}
			if (e.stopPropagation) { e.stopPropagation(); }
		};
		//element.addEventListener("click", onclick!.bind(element));
		element.onchange = on_change();

		element.setEmpty = function (v: boolean) {
			if (v) { this.classList.add("empty"); }
			else { this.classList.remove("empty"); }
		};

		element.expand = function () {
			this.setValue(true);
		};

		element.collapse = function () {
			this.setValue(false);
		};


		element.getValue = function () {
			return this.dataset["value"];
		};
	}

	setValue(v: boolean)
	{
		if (this.element.dataset["value"] == (v ? "open" : "closed")) { return; }

		if (!v) {
			this.element.dataset["value"] = "closed";
			this.element.innerHTML = "&#9658;";
			this.element.classList.remove("listopen");
			this.element.classList.add("listclosed");
		}
		else {
			this.element.dataset["value"] = "open";
			this.element.innerHTML = "&#9660;";
			this.element.classList.add("listopen");
			this.element.classList.remove("listclosed");
		}
		if (this.element.onchange) { this.element.onchange(new Event("change")); }
	}

	getElement()
	{
		return this.element;
	}
}

/**
 * List
 *
 * @class List
 * @constructor
 * @param {String} id
 * @param {Array} values
 * @param {Object} options
 */
class List
{
	root: HTMLUListElement;
	callback: CallableFunction;

	constructor(id: string, items: any[], options: any)
	{
		options = options || {};

		const root = this.root = document.createElement("ul") as HTMLUListElement;
		root.id = id;
		root.className = "litelist";
		const that = this;

		this.callback = options.callback;

		const onClickCallback = function (e: any) {
			const el = e.target;
			const list = root.querySelectorAll(".list-item.selected");
			for (let j = 0; j < list.length; ++j) {
				list[j].classList.remove("selected");
			}
			el.classList.add("selected");
			LiteGUI.trigger(that.root, "wchanged", el);
			if (that.callback) { that.callback(el.data); }
		};
		// Walk over every item in the list
		for (const i in items) {
			const item = document.createElement("li") as HTMLLIElementPlus;
			item.className = "list-item";
			item.data = items[i];
			item.dataset["value"] = items[i];

			let content = "";
			if (typeof (items[i]) == "string") { content = items[i] + "<span class='arrow'></span>"; }
			else {
				content = (items[i].name || items[i].title || "") + "<span class='arrow'></span>";
				if (items[i].id) { item.id = items[i].id; }
			}
			item.innerHTML = content;

			item.addEventListener("click", onClickCallback.bind(item));

			root.appendChild(item);
		}


		if (options.parent) {
			if (options.parent.root) { options.parent.root.appendChild(root); }
			else { options.parent.appendChild(root); }
		}
	}

	getSelectedItem()
	{
		return this.root.querySelector(".list-item.selected");
	}

	setSelectedItem(name: string)
	{
		const items = this.root.querySelectorAll(".list-item");
		for (let i = 0; i < items.length; i++) {
			const item: HTMLLIElementPlus = items[i] as HTMLLIElementPlus;
			if (item.data == name) {
				LiteGUI.trigger(item, "click");
				break;
			}
		}
	}
}


/**
 * Slider
 *
 * @class Slider
 * @constructor
 * @param {Number} value
 * @param {Object} options
 */
export class Slider
{
	root: HTMLDivElementPlus;
	value: number;
	options: any;
	doc_binded: any = null
	onChange?: Function;
	constructor(value: number, options: any)
	{
		this.options = options || {};
		
		const root = this.root = document.createElement("div") as HTMLDivElementPlus;
		this.value = value;
		root.className = "liteslider";

		root.addEventListener("mousedown", (e: any) => {
			let mouseX, mouseY;
			if (e.offsetX) { mouseX = e.offsetX; mouseY = e.offsetY; }
			else if (e.layerX) { mouseX = e.layerX; mouseY = e.layerY; }
			this.setFromX(mouseX);
			this.doc_binded = root.ownerDocument;
			this.doc_binded.addEventListener("mousemove", this.onMouseMove);
			this.doc_binded.addEventListener("mouseup", this.onMouseUp);
			e.preventDefault();
			e.stopPropagation();
		});

		this.setValue(value);
	}

	setFromX(x: number) {
		const rect = this.root.getBoundingClientRect();
		if (!rect) { return; }
		const width = rect.width;
		const norm = x / width;
		const min = this.options.min || 0.0;
		const max = this.options.max || 1.0;
		const range = max - min;
		this.setValue(range * norm + min);
	}

	onMouseMove(e: any) {
		const rect = this.root.getBoundingClientRect();
		if (!rect) { return; }
		const x = e.x === undefined ? e.pageX : e.x;
		const mouseX = x - rect.left;
		this.setFromX(mouseX);
		e.preventDefault();
		return false;
	}

	onMouseUp(e: any) {
		const doc = this.doc_binded || document;
		this.doc_binded = null;
		doc.removeEventListener("mousemove", this.onMouseMove);
		doc.removeEventListener("mouseup", this.onMouseUp);
		e.preventDefault();
		return false;
	}

	setValue(value: number, skip_event: boolean = false)
	{
		// Var width = canvas.getClientRects()[0].width;
		const min = this.options.min || 0.0;
		const max = this.options.max || 1.0;
		if (value < min) { value = min; }
		else if (value > max) { value = max; }
		const range = max - min;
		const norm = (value - min) / range;
		const percentage = (norm * 100).toFixed(1) + "%";
		const percentage2 = (norm * 100 + 2).toFixed(1) + "%";
		this.root.style.background = "linear-gradient(to right, #999 " + percentage + ", #FC0 " + percentage2 + ", #333 " + percentage2 + ")";

		if (value != this.value) {
			this.value = value;
			if (!skip_event) {
				LiteGUI.trigger(this.root, "change", value);
				if (this.onChange) { this.onChange(value); }
			}
		}
	};
}

/**
 * LineEditor
 *
 * @class LineEditor
 * @constructor
 * @param {Number} value
 * @param {Object} options
 */

export class LineEditor
{
	root: HTMLDivElementPlus;
	options: any;
	canvas: HTMLCanvasElement;
	selected: number;
	last_mouse: number[];
	constructor(value: any, options: any)
	{
		this.options = options || {};
		const element = this.root = document.createElement("div") as HTMLDivElementPlus;
		element.className = "curve " + (options.extraclass ? options.extraclass : "");
		element.style.minHeight = "50px";
		element.style.width = options.width || "100%";

		element.bgcolor = options.bgcolor || "#222";
		element.pointscolor = options.pointscolor || "#5AF";
		element.linecolor = options.linecolor || "#444";

		element.valuesArray = value;
		element.xrange = options.xrange || [0, 1]; // Min,max
		element.yrange = options.yrange || [0, 1]; // Min,max
		element.defaulty = options.defaulty != null ? options.defaulty : 0.5;
		element.no_trespassing = options.no_trespassing || false;
		element.show_samples = options.show_samples || 0;
		element.options = options;
		element.style.minWidth = "50px";
		element.style.minHeight = "20px";

		const canvas = this.canvas = document.createElement("canvas");
		canvas.width = options.width || 200;
		canvas.height = options.height || 50;
		element.appendChild(canvas);
		element.canvas = canvas;

		element.addEventListener("mousedown", this.onmousedown);

		this.selected = -1;

		this.last_mouse = [0, 0];

		this.redraw();
		//return element;
	}

	getValueAt(x: number)
	{
		if (x < this.root.xrange[0] || x > this.root.xrange[1]) { return this.root.defaulty; }

		let last = [this.root.xrange[0], this.root.defaulty];
		let f = 0, v: number[];
		for (let i = 0; i < this.root.valuesArray.length; i++) {
			v = this.root.valuesArray[i];
			if (x == v[0]) { return v[1]; }
			if (x < v[0]) {
				f = (x - last[0]) / (v[0] - last[0]);
				return last[1] * (1 - f) + v[1] * f;
			}
			last = v;
		}

		v = [this.root.xrange[1], this.root.defaulty];
		f = (x - last[0]) / (v[0] - last[0]);
		return last[1] * (1 - f) + v[1] * f;
	}

	resample(samples: number)
	{
		const r = [];
		const dx = (this.root.xrange[1] - this.root.xrange[0]) / samples;
		for (let i = this.root.xrange[0]; i <= this.root.xrange[1]; i += dx) {
			r.push(this.root.getValueAt(i));
		}
		return r;
	}

	addValue(v: number[])
	{
		for (let i = 0; i < this.root.valuesArray; i++) {
			const value = this.root.valuesArray[i];
			if (value[0] < v[0]) { continue; }
			this.root.valuesArray.splice(i, 0, v);
			this.redraw();
			return;
		}

		this.root.valuesArray.push(v);
		this.redraw();
	}

	// Value to canvas
	convert(v: number[]) {
		return [this.canvas.width * ((this.root.xrange[1] - this.root.xrange[0]) * v[0] + this.root.xrange[0]),
		this.canvas.height * ((this.root.yrange[1] - this.root.yrange[0]) * v[1] + this.root.yrange[0])];
	}

	// Canvas to value
	unconvert(v: number[]) {
		return [(v[0] / this.canvas.width - this.root.xrange[0]) / (this.root.xrange[1] - this.root.xrange[0]),
		(v[1] / this.canvas.height - this.root.yrange[0]) / (this.root.yrange[1] - this.root.yrange[0])];
	}

	redraw()
	{
		if(!this.canvas || !this.canvas.parentNode) { return; }
		const rect = (this.canvas.parentNode as HTMLCanvasElement).getBoundingClientRect();
		if (rect && this.canvas.width != rect.width && rect.width && rect.width < 1000) { this.canvas.width = rect.width; }
		if (rect && this.canvas.height != rect.height && rect.height && rect.height < 1000) { this.canvas.height = rect.height; }

		const ctx = this.canvas.getContext("2d");
		if (!ctx) { return; }
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.translate(0, this.canvas.height);
		ctx.scale(1, -1);

		ctx.fillStyle = this.root.bgcolor;
		ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		ctx.strokeStyle = this.root.linecolor;
		ctx.beginPath();

		// Draw line
		let pos = this.convert([this.root.xrange[0], this.root.defaulty]);
		ctx.moveTo(pos[0], pos[1]);

		for (const i in this.root.valuesArray) {
			const value: number[] = this.root.valuesArray[i];
			pos = this.convert(value);
			ctx.lineTo(pos[0], pos[1]);
		}

		pos = this.convert([this.root.xrange[1], this.root.defaulty]);
		ctx.lineTo(pos[0], pos[1]);
		ctx.stroke();

		// Draw points
		for (let i = 0; i < this.root.valuesArray.length; i += 1) {
			const value = this.root.valuesArray[i];
			pos = this.convert(value);
			if (this.selected == i) { ctx.fillStyle = "white"; }
			else { ctx.fillStyle = this.root.pointscolor; }
			ctx.beginPath();
			ctx.arc(pos[0], pos[1], this.selected == i ? 4 : 2, 0, Math.PI * 2);
			ctx.fill();
		}

		if (this.root.show_samples) {
			const samples = this.resample(this.root.show_samples);
			ctx.fillStyle = "#888";
			for (let i = 0; i < samples.length; i += 1) {
				const value = [i * ((this.root.xrange[1] - this.root.xrange[0]) / this.root.show_samples) + this.root.xrange[0], samples[i]];
				pos = this.convert(value);
				ctx.beginPath();
				ctx.arc(pos[0], pos[1], 2, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}

	onmousedown(evt: MouseEvent) {
		document.addEventListener("mousemove", this.onmousemove);
		document.addEventListener("mouseup", this.onmouseup);

		const rect = this.canvas.getBoundingClientRect();
		const mousex = evt.clientX - rect.left;
		const mousey = evt.clientY - rect.top;

		this.selected = this.computeSelected(mousex, this.canvas.height - mousey);

		if (this.selected == -1) {
			const v = this.unconvert([mousex, this.canvas.height - mousey]);
			this.root.valuesArray.push(v);
			this.sortValues();
			this.selected = this.root.valuesArray.indexOf(v);
		}

		this.last_mouse = [mousex, mousey];
		this.redraw();
		evt.preventDefault();
		evt.stopPropagation();
	}

	onmousemove(evt: MouseEvent) {
		const rect = this.canvas.getBoundingClientRect();
		let mousex = evt.clientX - rect.left;
		let mousey = evt.clientY - rect.top;

		if (mousex < 0) { mousex = 0; }
		else if (mousex > this.canvas.width) { mousex = this.canvas.width; }
		if (mousey < 0) { mousey = 0; }
		else if (mousey > this.canvas.height) { mousey = this.canvas.height; }

		// Dragging to remove
		if (this.selected != -1 && this.distance([evt.clientX - rect.left, evt.clientY - rect.top], [mousex, mousey]) > this.canvas.height * 0.5) {
			this.root.valuesArray.splice(this.selected, 1);
			this.onmouseup(evt);
			return;
		}

		const dx = this.last_mouse[0] - mousex;
		const dy = this.last_mouse[1] - mousey;
		const delta = this.unconvert([-dx, dy]);
		if (this.selected != -1) {
			let minx = this.root.xrange[0];
			let maxx = this.root.xrange[1];

			if (this.root.no_trespassing) {
				if (this.selected > 0) { minx = this.root.valuesArray[this.selected - 1][0]; }
				if (this.selected < (this.root.valuesArray.length - 1)) { maxx = this.root.valuesArray[this.selected + 1][0]; }
			}

			const v = this.root.valuesArray[this.selected];
			v[0] += delta[0];
			v[1] += delta[1];
			if (v[0] < minx) { v[0] = minx; }
			else if (v[0] > maxx) { v[0] = maxx; }
			if (v[1] < this.root.yrange[0]) { v[1] = this.root.yrange[0]; }
			else if (v[1] > this.root.yrange[1]) { v[1] = this.root.yrange[1]; }
		}

		this.sortValues();
		this.redraw();
		this.last_mouse[0] = mousex;
		this.last_mouse[1] = mousey;
		this.onchange();

		evt.preventDefault();
		evt.stopPropagation();
	}

	onmouseup(evt: MouseEvent)
	{
		this.selected = -1;
		this.redraw();
		document.removeEventListener("mousemove", this.onmousemove);
		document.removeEventListener("mouseup", this.onmouseup);
		this.onchange();
		evt.preventDefault();
		evt.stopPropagation();
	}

	onresize(e: any)
	{
		this.redraw();
	}

	onchange()
	{
		if (this.options.callback) { this.options.callback.call(this.root, this.root.value); }
		else { LiteGUI.trigger(this.root, "change"); }
	}

	distance(a: number[], b: number[]) { return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2)); }

	computeSelected(x: number, y: number) {
		let min_dist = 100000;
		const max_dist = 8; // Pixels
		let selected = -1;
		for (let i = 0; i < this.root.valuesArray.length; i++) {
			const value = this.root.valuesArray[i];
			const pos = this.convert(value);
			const dist = this.distance([x, y], pos);
			if (dist < min_dist && dist < max_dist) {
				min_dist = dist;
				selected = i;
			}
		}
		return selected;
	}

	sortValues() {
		let v = null;
		if (this.selected != -1) { v = this.root.valuesArray[this.selected]; }
		this.root.valuesArray.sort((a: number[], b: number[]) => { return a[0] - b[0]; });
		if (v) { this.selected = this.root.valuesArray.indexOf(v); }
	}
}


class ComplexList
{
	root: HTMLDivElement;
	options: any;
	item_code: string;
	selected: number | null;
	onItemSelected: Function | null;
	onItemToggled: Function | null;
	onItemRemoved: Function | null;

	constructor(options: any)
	{
		this.options = options || {};

		this.root = document.createElement("div");
		this.root.className = "litecomplexlist";

		this.item_code = options.item_code || "<div class='listitem'><span class='tick'><span>" + LiteGUI.special_codes.tick + "</span></span><span class='title'></span><button class='trash'>" + LiteGUI.special_codes.close + "</button></div>";

		if (options.height) {
			this.root.style.height = LiteGUI.sizeToCSS(options.height) as string;
		}

		this.selected = null;
		this.onItemSelected = null;
		this.onItemToggled = null;
		this.onItemRemoved = null;
	}

	addTitle(text: string)
	{
		const elem = LiteGUI.createElement("div", ".listtitle", text);
		this.root.appendChild(elem);
		return elem;
	};

	addHTML(html: any, on_click: CallableFunction)
	{
		const elem = LiteGUI.createElement("div", ".listtext", html);
		if (on_click) { elem.addEventListener("mousedown", on_click); }
		this.root.appendChild(elem);
		return elem;
	};

	clear()
	{
		this.root.innerHTML = "";
	};

	addItem(item: any, text: string, is_enabled: boolean, can_be_removed: boolean)
	{
		const title = text || item.content || item.name;
		const elem = LiteGUI.createListItem(this.item_code, { ".title": title });
		elem.item = item;

		if (is_enabled) { elem.classList.add("enabled"); }

		if (!can_be_removed) { elem.querySelector(".trash").style.display = "none"; }

		const that = this;
		elem.addEventListener("mousedown", (e: any) => {
			e.preventDefault();
			elem.setSelected(true);
			if (that.onItemSelected) {
				that.onItemSelected(item, elem);
			}
		});
		elem.querySelector(".tick").addEventListener("mousedown", (e: any) => {
			e.preventDefault();
			elem.classList.toggle("enabled");
			if (that.onItemToggled) {
				that.onItemToggled(item, elem, elem.classList.contains("enabled"));
			}
		});

		elem.querySelector(".trash").addEventListener("mousedown", (e: any) => {
			e.preventDefault();
			e.stopPropagation();
			e.stopImmediatePropagation();
			if (that.onItemRemoved) {
				that.onItemRemoved(item, elem);
			}
		});

		elem.setContent = function (v: string, is_html: boolean) {
			if (is_html) {
				elem.querySelector(".title").innerHTML = v;
			}
			else {
				elem.querySelector(".title").innerText = v;
			}
		};

		elem.toggleEnabled = function () {
			elem.classList.toggle("enabled");
		};

		elem.setSelected = function (v: boolean) {
			LiteGUI.removeClass(that.root, "selected");
			if (v) {
				this.classList.add("selected");
			}
			else {
				this.classList.remove("selected");
			}
			that.selected = elem.item;
		};

		elem.show = function () { this.style.display = ""; };
		elem.hide = function () { this.style.display = "none"; };

		this.root.appendChild(elem);
		return elem;
	}
}