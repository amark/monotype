Monotype
========

Monotype so that way your font doesn't have to monospace!

Monotype is an excellent library that allows you to perform arbitrary formatting or filtering on your user's contenteditable input while they type.

#Problem

Existing DOM Range libraries, which handle caret position and selections, cannot restore themselves properly if the document tree is modified. Therefore one cannot alter the HTML without abruptly interrupting the user and losing their focus. This is because a range is bound to a node, thus if it is removed the range is destroyed. Monotype takes an exciting new approach, where ranges are restored based on the input's content rather than a tree. A whole new world of opportunities is now possible, which previously was implausible.

If you have not already been aggravated by this problem, I'm surprised you have even read this far - it is the sort of thing that seems like it would be a 'given'. Let's dive into some explanations, or if you are familiar with it - just skip to the demos.

###Examples

1. Facebook inline friend-tagging. As a developer you may think it is just as easy as highlighting the name and wrapping a stylized span tag around it. Right? Nope. First off, the entry field is a textarea which doesn't allow any formatting, just raw text. Second, even if it did, the insertion of an element behind the caret would change the caret's offset in the parent node, which would force you to restore it manually.
So how does Facebook do it? This will sound ugly, because it is. They make the textarea have an invisible background, then they layer a container behind it that replicates the textarea. This container can then be formatted, such that the necessary stylizing can be achieved.

2. Browser based IDEs and code editors. You may have noticed that your favorite online editors require you to use monospace fonts. But have you ever thought why that is the case? It is not to enhance the nerdy superpower aesthetic, but once again because formatting text during user input is tricky. They go a few nasty steps further, because we all want nicely color printed syntax. However, this is not possible with Facebook's technique because the textarea on top has a solid font color, which would block the coloring beneath.
As a result we have to make the entire textarea invisible, not just the background. We still need it on top though, to catch click focus (or rig up a pass-through system) - but poses the user a problem, what are they clicking on? The user can no longer see their caret in the textarea because the textarea is hidden! 
To solve this we need to emulate a caret below, but matching caret position is the nasty part given the imprecision of character widths in fonts. If though, a font existed that had the exact same width for every character, then matching the position up would be trivial. Just count how many characters there are on a given line and multiply by a pixel width to get the absolute position of the caret aligned with the text.

Phew! Or we could just use Monotype.

#Solution

Introducing Monotype, unlimited formatting for free. But that is not all, Monotype also allows you to sanitize user input on the fly! Hopefully though, you do not need an exposé on why [unfiltered user input](http://stackoverflow.com/questions/1732348/regex-match-open-tags-except-xhtml-self-contained-tags) is a bad idea. That digression shall not happen here. Onwards to the demos!

Monotype is not designed or intended to be a full fledged editor, it instead lays a reliable foundation for you to build an editor on top without worrying about caret trickery. Use it in place of your existing Range library or native code. 

#Demos
[Examples](http://db.marknadal.com/monotype/test/mocha.html) ([45s video](http://www.screenr.com/Al7N))

#API
When you want to save the current range selection or caret, which is typically right before any formatting or filtering, do:

`r = monotype(editor)`

Where editor is the jQuery element of your contenteditable container, r is whatever variable you hence forth want to call your saved selection, and monotype is the global given to you when you included the script tag.
When you fancy you'd like to restore the user's selection, just:

`r.restore()`

Simple enough? Excellently so. Check out the code behind the demos if you need any further illustrations.

#Support
Monotype is a mean and lean **1.5KB** gzipped. Chrome, FF 3.6+, Safari 5.1+, some Opera/IE6+ and full IE9+.  No dependencies other than the fantastic jQuery. However, it is doing minimal support of cross-browser DOM traversal and checking, so it hypothetically could be easy to replace and remove. There is a known problem of backtracking in certain browsers.


Crafted with love by Mark Nadal, whom is not responsible for any liabilities from the use of this code.
