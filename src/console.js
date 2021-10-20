// Enclose in a scope
(function()
{

	function Console(options)
	{
		options = options || {};

		this.root = document.createElement("div");
		this.root.className = "liteconsole";
		this.root.innerHTML = "<div class='log'></div><div class='foot'><input type='text'/></div>";

		this.log_element = this.root.querySelector('.log');
		this.input = this.root.querySelector('input');

		this.input.addEventListener("keydown", this.processKeyDown.bind(this));
		this._prompt = options.prompt || "]";

		this.onAutocomplete = null; // Receives string, must return final string
		this.onProcessCommand = null; // Receives input value

		this.history = [];
		this._history_offset = 0;
	}

	Console.prototype.processKeyDown = function(e)
	{
		if (this._input_blocked)
		{return;}

		if (e.keyCode == 13) // Return and exec
		{
			const value = this.input.value;
			const cmd = value.trim();
			this.addMessage(this._prompt + cmd, "me",true);
			this.input.value = "";
			this.history.push(cmd);
			if (this.history.length > 10) {this.history.shift();}
			if (this.onProcessCommand) {this.onProcessCommand(cmd);}
			this._history_offset = 0;
		}
		else if (e.keyCode == 38 || e.keyCode == 40) // Up & down history
		{
			this._history_offset += (e.keyCode == 38 ? -1 : 1);
			if (this._history_offset > 0)
			{
				this._history_offset = 0;
			}
			else if (this._history_offset < -this.history.length)
			{
				this._history_offset = -this.history.length;
			}
			const pos = this.history.length + this._history_offset;
			if (pos < 0) {return;}
			if (pos >= this.history.length)
			{
				this.input.value = "";
			}
			else
			{
				this.input.value = this.history[ pos ];
			}
		}
		else if (e.keyCode == 9) // Tab autocompletion
		{
			if (this.onAutocomplete)
			{
				this.input.value = this.onAutocomplete(this.input.value);
			}
			else
			{
				return;
			}
		}
		else
		{
			return;
		}
		e.preventDefault();
		e.stopPropagation();
	};

	Console.prototype.addMessage = function(text,className,as_text)
	{
		const content = this.log_element;
		let element = null; // Contains the last message sent

		if (text && text.constructor === Array)
		{
			for (let i = 0; i < text.length; ++i)
			{add(text[i]);}
		}
		else if (text && text.constructor === Object)
		{
			add(JSON.stringify(text,null,""), this);
		}
		else
		{add(text, this);}

		function add(txt, con)
		{
			element = document.createElement("pre");
			if (as_text)
			{element.innerText = txt;}
			else
			{element.innerHTML = txt;}
			element.className = "msg";
			if (className)
			{element.className += " " + className;}
			content.appendChild(element);
			if (content.children.length > 1000)
			{content.removeChild(content.children[0]);}
		}

		this.log_element.scrollTop = 1000000;
		element.update = function(v)
		{
			this.innerHTML = v;
		};

		return element;
	};

	Console.prototype.log = function()
	{
		const args = Array.prototype.slice.call(arguments);
		const d = args.join(",");
		return this.addMessage(d, "msglog");
	};

	Console.prototype.warn = function()
	{
		const args = Array.prototype.slice.call(arguments);
		const d = args.join(",");
		return this.addMessage(d, "msgwarn");
	};

	Console.prototype.error = function()
	{
		const args = Array.prototype.slice.call(arguments);
		const d = args.join(",");
		return this.addMessage(d, "msgerror");
	};

	Console.prototype.clear = function()
	{
		this.log_element.innerHTML = "";
	};

	LiteGUI.Console = Console;





}());