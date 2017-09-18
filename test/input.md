Title:Using Markdawn
Subtitle:An example
Version:v1.0.0
Author:Giacomo Tagliabue
Department:Department of Astrology
University:MIT
Address:45 Bar Ave
Date:11/12/13

# Lorem

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam facilisis nibh quis condimentum luctus. Etiam lacus eros, dignissim quis erat sit amet, ultricies convallis eros. Aenean volutpat aliquet nisi, id congue ligula aliquam a. Curabitur feugiat nibh eu condimentum malesuada. Maecenas arcu nulla, [This is a link](http://google.com) lacinia in lectus at, placerat vulputate massa. Donec mollis tortor non quam consectetur, at pharetra tellus pellentesque. Curabitur maximus, massa et finibus pharetra, risus ante placerat ipsum, nec fringilla massa lectus scelerisque lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu felis sit amet felis facilisis condimentum et vel ex. Duis interdum dui at velit auctor, nec aliquet nibh laoreet. Praesent nec tincidunt orci.

Donec accumsan quis felis a cursus. Fusce est eros, mollis id ultrices id, elementum eget est. Aliquam sollicitudin consequat consectetur. Nullam ultricies elit vitae sapien laoreet, et hendrerit dolor pulvinar. Nam dignissim velit erat, vel viverra nulla faucibus id. Sed eu mattis turpis. Aliquam magna est, consequat sed dui at, lobortis finibus nulla. Maecenas lorem nibh, faucibus nec tempor id, rhoncus sed nibh. Cras non mauris vitae ante auctor eleifend vel at erat.

Aliquam condimentum auctor nibh et eleifend. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec venenatis iaculis nunc vitae maximus. Sed bibendum pretium magna at hendrerit. Vivamus eu nibh lobortis, elementum risus quis, gravida nisi. Nullam a hendrerit mauris. Proin fermentum diam nisl, suscipit euismod nunc semper non. Integer eu turpis ut leo consectetur euismod ac quis eros. Maecenas augue leo, cursus ut sem a, maximus finibus ipsum. Morbi ligula mauris, tempus in quam sed, congue placerat lacus. Vivamus congue urna massa, id facilisis augue fermentum nec. Cras vel pulvinar diam, ac euismod ipsum. In feugiat ante mattis, molestie mauris non, tincidunt diam. Phasellus faucibus leo vel nisi auctor mollis. In ac arcu mollis, bibendum dui eu, pharetra dui.

# h1 Section
## h2 Section
### h3 Section
#### h4 Section
##### h5 Section
###### h6 Section


## Horizontal Rules

___

---

***


# Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,

Remarkable -- awesome

"Smartypants, double quotes"

'Smartypants, single quotes'


# Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Deleted text~~

Superscript: 19^th^

Subscript: H~2~O

++Inserted text++

==Marked text==


# Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


# Lists

Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`

Start numbering with offset:

57. foo
1. bar


# Code

Inline `code`

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"

```
Sample text here...
```

Syntax highlighting

``` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

# Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


# Links

[link text](https://giacomotag.io)

[link with title](https://giacomotag.io "title text!")

Autoconverted link https://giacomotag.io


# Images

![Minion](https://octodex.github.com/images/minion.png)
![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

[id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


# Footnotes

Footnote 1 link[^first].

Footnote 2 link[^second].

Inline footnote^[Text of inline footnote] definition.

Duplicated footnote reference[^second].

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.


# Definition lists

Term 1

:   Definition 1
with lazy continuation.

Term 2 with *inline markup*

:   Definition 2

        { some code, part of Definition 2 }

    Third paragraph of definition 2.

_Compact style:_

Term 1
  ~ Definition 1

Term 2
  ~ Definition 2a
  ~ Definition 2b


# Abbreviations

This is HTML abbreviation example.

It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

*[HTML]: Hyper Text Markup Language
