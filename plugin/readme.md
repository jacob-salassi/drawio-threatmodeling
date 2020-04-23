Our current approach to creating DFD metadata is "wrong" from an mxgraph perspective.

What we do today is take multiple shapes, and arbitrarily layer them on top of eachother. This is visual metadata, but the underlying mxgraph implementation is not specifically aware of these relationships.

How could we solve it?

If we constrain our thinking to how we operate today, it would seem to be a problem of processing the diagram both as a graph, and then a second pass using cartesian coordinates comparing the location of known vertices with other unconnected objects (zone box tag, stride box tag).

This implementation as it turns out, is not well aligned with how the mxgraph authors envisioned embedding metadata into objects in the graph - in fact what we have is not strictly a graph because of these arbitrary objects polluting it.

Instead, mxgraph allows you to embed an arbitrary JSON object called 'value' into every vertex. This is called a user object. You can then use mxgraph + your user object to create custom interactions.

Understanding this is important from both a diagram creation and consumption perspective. No matter what implementation we choose to consume the diagram, it is likely creation will happen using draw.io.
