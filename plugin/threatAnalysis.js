/**
 * The plan for implementing this shit:
 * [ X ] User objects, are they the foundational building block for this?
 * [ X ] Figure out the answer to this
 * 
 *  Maybe overthinking user object, its just something you can arbitrarily embed whatever you want in, that
 *  has the lifetime of a cell.
 * 
 * [  ] Create a cell with an artbirary user object in it, inspect XML
 * 	- goal here is to understand how the pre-packed shape templates might embed user object in shape/cell .. ?
 */
Draw.loadPlugin(function(editorUi)
{
	var div = document.createElement('div');
	
	// Adds resource for action
	mxResources.parse('threatAnalysis=STRIDE analysis');

	// Adds action
	editorUi.actions.addAction('threatAnalysis', function()
	{
		var graph = editorUi.editor.graph;
		var model = graph.model;
		
		// Overrides method to disallow edge label editing
		graph.isCellEditable = function(cell)
		{
			return !this.getModel().isEdge(cell);
		};
		graph.getLabel = function(cell) { return(cell.value.third); };
		graph.convertValueToString = function(cell)
		{
			/*
			if (mxUtils.isNode(cell.value))
			{
				if (cell.value.nodeName.toLowerCase() == 'person')
				{
					var firstName = cell.getAttribute('firstName', '');
					var lastName = cell.getAttribute('lastName', '');

					if (lastName != null && lastName.length > 0)
					{
						return lastName + ', ' + firstName;
					}

					return firstName;
				}
				else if (cell.value.nodeName.toLowerCase() == 'knows')
				{
					return cell.value.nodeName + ' (Since '
							+  cell.getAttribute('since', '') + ')';
				}

			}

			return '';
			*/
			return cell.value.third;
		};

		// Sample user objects with 2 fields
		var value = new Object();
		value.first = 'First value';
		value.second = 'Second value';
		value.third = 'hi';

		// Gets the default parent for inserting new cells. This
		// is normally the first child of the root (ie. layer 0).
		var parent = graph.getDefaultParent();
		new mxKeyHandler(graph);


		model.beginUpdate();
		try
		{
			// Overrides method to provide a cell label in the display
			
			var v1 = graph.insertVertex(parent, null, value, 100, 60, 120, 80, 'overflow=fill;');
						
		}
		finally
		{
			model.endUpdate();
		}

		// Queue used to fix ancestor placeholders
		var queue = [];


		for (var id in model.cells)
		{
			var cell = model.cells[id];
			var label = graph.getLabel(cell);

			if (cell.isEdge()) {
				alert(`${label} edge`)
			}

			if (cell.getEdgeCount()) {
				alert(`${label} has edges`)
				target = cell.getTerminal(source=true)

			}

			queue.push({cell: cell, label: label});
		}
		
/*		for (var i = 0; i < queue.length; i++)
		{
			model.setValue(queue[i].cell, queue[i].label);
		}
*/
	});
	
	var menu = editorUi.menus.get('extras');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		editorUi.menus.addMenuItems(menu, ['-', 'threatAnalysis'], parent);
	};

});
