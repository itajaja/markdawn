Title: A Sample Mathematics Paper
Author: Edward R. Scheinerman
Department: Department of Applied Mathematics and Statistics
University: The Johns Hopkins University  
Address: Baltimore, Maryland 21218 USA
Date: May 13, 2005 

# Abstract

This is a sample \LaTeX\ paper; its purpose is to show the basics of setting up a paper and important features of \LaTeX. It can also be used for assignments or other short notes.

This is a sample LaTeX paper; its purpose is to show the basics of setting up a paper and important features of LaTeX. It can also be used for assignments or other short notes.

# Introduction

This is a simple LaTeX document designed to illustrate the basics of typesetting a paper. The ideas shown here can be adapted for a more informal document, such as a homework assignment.

This document is created from various source files, the most important of which is named `paper.tex`. By reading `paper.tex` along side the typeset output, the diligent reader should be able to deduce how various parts of LaTeX work. Indeed, you cannot understand everything that we did in this paper without looking at the source file. For example, how did we type LaTeX?

Remember that LaTeX is a markup language and not a what-you-see-is-what-you-get word processor.

Good luck.

# Basic Stuff

[sect:basics]

## Files and commands

LaTeX converts files you type into professional-looking typeset documents. You type your LaTeX document using a text editor (such as Emacs on a Unix computer or in an integrated editor in a TeXsystem). This file’s name should end “`.tex`”. The file that produced this document is `paper.tex`; it is a moderately complicated LaTeX source file; for a *much* simpler example, see `hello-world.tex`.

There are several ways to convert a LaTeX source file (such as
`hello-world.tex`) into a typeset document. The standard method (on a Unix system) is to type the shell command:

    latex hello-world

This produces an output file `hello-world.dvi`.

To view this file on your screen, you need a DVI-viewing program; on Unix, type this:

    xdvi hello-world &

and a window will open showing your typeset document.

To print your typeset document, Unix users type this:

    dvips hello-world

If TeX has not been properly configured for US Letter Paper
($8\frac12\times11$ inches), you may need to type this instead:

    dvips hello-word -t letter

To print only pages 11 to 17 of a document, type this:

    dvips hello-world -pp11-17

It is possible to use LaTeX to produce a PDF (Acrobat Reader format) document using this command:

    pdflatex hello-world

Some more detail on PDF files is presented in Section [sect:pdf].

On Unix, the typical working environment consists of a text editor (such as Emacs) in one window, a shell in a second window, and a preview of the typeset document (provided by `xdvi`) in a third. However, there are various integrated TeX enviroments for Windows and Macintosh in which pull-down menus can be used instead of typing `latex hello-world`, etc.

If you can process the `hello-world.tex` file, you are ready to get to work. It’s time to start typing!

## Skeleton of a LaTeX document

The first line of a typical LaTeX document is this:

    \documentclass[12pt]{article}

(The optional `[12pt]` sets the overall point size for the main text of your document to 12 points. You may use `[11pt]` for 11 point text or omit this for 10 point.)

The lines immediately following `\documentclass` are known as the
*preamble* of your document. This is where you define your own commands, load optional packages, etc. In the simple `hello-world.tex` file, there are no lines in the preamble section. For this document, there are several.

The main text of the document is enclosed between lines that say
`\begin{document}` and `\end{document}`. This is where you type the words you want to appear on your paper. (Look for those lines now in the file `paper.tex`.)

## Typing and fonts

[subsect:typing]

To type ordinary text, simply type what you want. To start a new paragraph, simply skip a line.

Certain characters have special meanings. The two most important are the backslash (`\`) and the dollar sign (`$`). Most LaTeXcommands are preceded by a backslash. All mathematical symbols should be enclosed by dollar signs. If you need a dollar sign in ordinary text, you can type
`\$` to produce, say, “Dan Naiman owes me \$5.” I can’t think of any occasion where you need a backslash in ordinary text. (You cannot produce a backslash in ordinary text by typing `\\`.)

Use the correct quotation marks. To enclose words in double quotes, begin with two back tick characters[^2] ``` `` ``` and end with two apostrophes `''`. Do not use the double quote key `"`. To enclose words in single quotes, begin with a single back tick character and end with a single apostrophe.

Typically, you should not need to change the size of the text you are typing. Use the logical structures of LaTeX and let the computer pick the appropriate size.[^3] The overall point size of the document is indicated at the beginning of the file as an optional argument to the
`\documentclass` command.

Likewise with font style. In general, you do not need to pick the font. Variable names in mathematics mode are automatically typeset in italics as in $x+1$. Similiarly, the font style in section heads, theorems, etc., are automatically produced for you. For example:

[thm:pyth] Suppose the lengths of the legs of a right triangle are $a$ and $b$, and the length of the hypotenuse is $c$. Then $a^2+b^2=c^2$.

However, there are times you may wish to use italics to show emphasis. To do this enclose your text in `\emph{...}` as in: I am *still* waiting for him to pay me back.

*Never use mathematics mode to typeset ordinary text in italics.* If you do, the result will look $awful$.

To typeset in boldface enclose your text in `\textbf{...}` and to typeset in sans serif enclose in `\textsf{...}`. However, you probably will not need to use these in ordinary text. (Later we talk about math typeset in bold, e.g., for vectors.)

To typeset in Caps and Small Caps use `\textsc{...}`. To typeset in
`typewriter font` use `\texttt{...}`. However, to show something that looks like computer code, you probably want to use one of the verbatim methods; look inside this document to figure out how we did it. The starred version of the verbatim environment shows spaces with a
`funny little symbol`.

The system of fonts used by LaTeX is known as the Computer Modern family. If you prefer Times Roman, include these commands in the preamble of your file:

    \usepackage{times}
    \usepackage{mathptm}

## Accents

Don’t be naïve, ordering á la carte is expensive. Don’t use ö when you write Erds. Be honest; don’t put up a façade. Use Hôpital’s rule.

## Lists

For numbered lists use the `enumerate` enviroment and for bulleted lists use the `itemize` environment as in these examples.

This is a numbered list.

1.  If you loan money to faculty members, be sure to get an I.O.U.

2.  To be sure that students show up for events, serve food.

This is a bulleted list.

-   LaTeX does an excellent job of typesetting mathematics papers.

-   LaTeX can easily produce beautiful results that are 99% perfect.

-   You can drive yourself crazy on that last 1%. Don’t bother.

You can nest these types of lists inside each other.

# Mathematics

## Basic math

Whenever you typeset mathematical notation, it needs to be inside a mathematics environment. The simplest way to do this is to enclose the notation between single dollar signs `$`. For example: If $a$ is an integer, then $2a+1$ is odd.

Superscripts and subscripts are created using the characters `^` and
`_`, respectively: $x^2+y^2=1$ and $a_n=0$. It is fine to have both on a single letter: $x_0^2$.

If the superscript [or subscript] is more than a single character, enclose the superscript in curly braces: $e^{-x}$.

Greek letters are typed using commands such as `\gamma` ($\gamma)$ and
`\Gamma` ($\Gamma$).

Named mathematics operators are usually typeset in roman. Most of the standards are already available. Some examples: $\det A$, $\cos\pi$, and
$\log(1-x)$. If LaTeX doesn’t already have the operator you like, you can create your own[^4] using the `DeclareMathOperator` command. For example, to make `\id` the identity operator:

    \DeclareMathOperator{\id}{id}

Now we can type `$\id(x)$` to produce $\id(x)$. The
`\DeclareMathOperator` command must go in the preamble (before
`\begin{document}`).

## Displayed equations

When an equation becomes too large to run in-line, you display it on a line by itself by enclosing it in double dollar signs `$$`.
$$f(x) = 5x^{10}-9x^9 + 77x^8 + 12x^7 + 4x^6 - 8x^5 + 7x^4 + x^3 -2x^2 +
3x + 11.$$

If you want a numbered equation, enclose it in `\begin{equation}` and
`\end{equation}`.

$$\label{eq:polynomial} g(x) = x^{10}+x^9 - x^3 -x -1.$$

The numbering is automatically provided by LaTeX.

If you want to number an equation with your own number (don’t!) or symbol (maybe), you can do this: $$h(x) = f(x)+g(x). \eqno{(*)}$$

The `\begin{align*}...\end{align*}` environment is superb for lining up equations. (Omit the `*` for numbered equations.)

$$\begin{aligned}
  (x-y)^2
  &= (x-y)(x-y)\\
  &= x^2 -yx - xy + y^2 \\
  &= x^2 -2xy +y^2.\end{aligned}$$

$$\begin{aligned}
3x-y&=0 & 2a+b &= 4 \\ x+y &=1 & a-3b &=10\end{aligned}$$

To insert ordinary text inside of mathematics mode, use `\text`: $$ f(x)
= . $$ This is the $3^{\text{rd}}$ time I’ve asked for my money back.

The `\begin{cases}...\end{cases}` environment is perfect for defining functions piecewise: $$ |x| =

x &\
-x &

$$

## Relations and operations

-   Equality-like: $x=2$, $x \not= 3$, $x \cong y$, $x \propto y$,
    $y\sim
    z$, $N \approx M$, $y \asymp z$, $P \equiv Q$.

-   Order: $x < y$, $y \le z$, $z \ge 0$, $x \preceq y$, $y\succ z$,
    $A \subseteq B$, $B \supset Z$.

-   Arrows: $x \to y$, $y\gets x$, $A \Rightarrow B$, $A \iff B$,
    $x \mapsto f(x)$, $A \Longleftarrow B$.

-   Set stuff: $x \in A$, $b \notin C$, $A \ni x$. Use `\notin` rather
    than `\not\in`. $A \cup B$, $X \cap Y$, $A \setminus B = \emptyset$.

-   Arithmetic: $3+4$, $5-6$, $7\cdot 8 = 7\times8$,
    $3\div6=\frac{1}{2}$, $f\circ g$, $A \oplus B$, $v \otimes w$.

-   Mod: As a binary operation, use `\bmod`: $x \bmod N$. As a relation
    use `\mod`, `\pmod`, or `\pod`:

    $$\begin{aligned}
        x &\cong y \mod 10 \\
        x &\cong y \pmod{10} \\
        x &\cong y \pod{10}
      \end{aligned}$$

-   Calculus: $\partial F/\partial x$, $\nabla g$.

## Use the right dots

Do not type three periods; instead use `\cdots` between operations and
`\ldots` in lists: $x_1 + x_2 + \cdots + x_n$ and
$(x_1,x_2,\ldots,x_n)$.

## Built up structures

-   Fractions: $\frac{1}{2}$, $\frac{x-1}{x-2}$.

-   Binomial coefficients: $\binom{n}{2}$.

-   Sums and products. Do *not* use `\Sigma` and `\Pi`.
    $$\sum_{k=0}^\infty \frac{x^k}{k!} \not= \prod_{j=1}^{10} \frac{j}{j+1}.$$
    $$\bigcup_{k=0}^\infty A_k
    \qquad
    \bigoplus_{j=1}^\infty V_j$$

-   Integrals: $$\int_0^1  x^2 \, dx$$ The extra bit of space before the
    $dx$ term is created with the `\,` command.

-   Limits: $$\lim_{h\to0} \frac{\sin(x+h) - \sin(x)}{h} = \cos x .$$
    Also $\limsup_{n\to\infty} a_n$.

-   Radicals: $\sqrt{3}$, $\sqrt[3]{12}$, $\sqrt{1+\sqrt{2}}$.

-   Matrices:
    $$A = \left[\begin{matrix} 3 & 4 & 0 \\ 2 & -1 & \pi \end{matrix}\right] .$$
    In line: $A = \left[\begin{smallmatrix}1 & 0 \\ 0 &
      1\end{smallmatrix}\right]$. A big matrix: $$D = \left[
        \begin{matrix}
          \lambda_1 & 0 & 0 & \cdots & 0 \\
          0 & \lambda_2 & 0 & \cdots & 0 \\
          0 & 0 & \lambda_3 & \cdots & 0 \\
          \vdots & \vdots & \vdots & \ddots & \vdots \\
          0 & 0 & 0 & \cdots & \lambda_n
        \end{matrix}
        \right].$$

## Delimiters

-   Parentheses and square brackets are easy: $(x-y)(x+y)$, $[3-x]$.

-   For curly braces use `\{` and `\}`: $\{x : 3x-1 \in A\}$.

-   Absolute value: $|x-y|$, $\|\vec{x} - \vec{y}\|$.

-   Floor and ceiling: $\lfloor \pi \rfloor = \lceil e \rceil$.

-   To make delimiters grow so they are properly sized to contain their
    arguments, use `\left` and `\right`:
    $$\left[ \sum_{n=0}^\infty a_n x^n \right]^2 =
    \exp \left\{ - \frac{x^2}{2} \right\}$$

    Occasionally, it is useful to coerce a larger sized delimiters than
    `\left`/`\right` produce. Look at the two sides of this equation:
    $$\left((x_1+1)(x_2-1)\right)
    =
    \bigl((x_1+1)(x_2-1)\bigl).$$ I think the right is better. Use
    `\bigl`, `\Bigl`, `\biggl`, and the matching `\bigr`, etc.

-   Underbraces: $$ ~~ = n . $$

## Styled and decorated letters

-   Primes: $a'$, $b''$.

-   Hats: $\bar a$, $\hat a$, $\vec a$, $\widehat{a_j}$.

-   Vectors are often set in bold: $\mathbf{x}$. Don’t use `\textbf` in
    mathematics mode and don’t use `\mathbf` in text mode.

-   Calligraphic letters (for sets of sets): $\mathcal{A}$.

-   Blackboard bold for number systems: $\mathbb{C}$.

## Defining your own commands

You can (and should) define your own commands (also called macros). For example, if you refer to the positive orthant $\mathbb{R}^n_+$ frequently, put the following line in your preamble:

    \newcommand{\rnp}{\mathbb{R}^n_+}

Then, you can just type `$\rnp$` instead of `$\mathbb{R}^n_+$`. Also, if later you decide that you prefer $\mathbf{R}$ instead of $\mathbb{R}$, you only have to change the definition of `\rnp`.

It is possible to define commands that take arguments. For example, suppose your paper uses column vectors frequently. We define a new command named `\col` like this:

    \newcommand{\col}[1]{\left[\begin{matrix} #1 \end{matrix} \right]}

The `[1]` means that `\col` takes one argument. The `#1` shows where that one argument goes. Now we can type
$$\left[\begin{matrix} 1\\2\\3 \end{matrix} \right] + \left[\begin{matrix} -1\\3\\-2 \end{matrix} \right] = \left[\begin{matrix} 0\\5\\1 \end{matrix} \right]$$ easily.

Here’s another example. Suppose the expression $\binom{a^2 + b^2}{a+b}$ appears often (but with different values for $a$ and $b$). Let’s call the combinatorial oddity `\comb` and define it like this:

    \newcommand{\comb}[2]{\binom{#1^2 + #2^2}{#1+#2}}

and use it like this: `$\comb{a}{b}$`.

# Theorem/Proof

In the preamble of this document, find the following lines:

    \newtheorem{thm}{Theorem}[section]
    \newtheorem{lem}[thm]{Lemma}
    \newtheorem{prop}[thm]{Proposition}
    \newtheorem{cor}[thm]{Corollary}
    \newtheorem{conj}[thm]{Conjecture}

The first line defines a `\begin{thm}...\end{thm}` environment. This will produce a theorem named “Theorem” and the numbering style will be based on the section (e.g., Theorem 2.1); omit the `[section]` and the numbering will be absolute (e.g., Theorem 1).

The second line defines a `\begin{lem}...\end{lem}` environment to produce theorems marked “Lemma”. The `[thm]` means that this environment shares the same numbering as `thm`.

So we get this:

A subset of the real line is compact if and only if it is closed and bounded.

In any graph, the sum of the degrees of the vertices is twice the number of edges.

All perfect numbers are even.

Theorems with names can have those names inserted like this:

[Fundamental Theorem of Algebra] Let $p$ be a polynomial with complex coefficients. Then there exists $z \in \mathbb{C}$ such that $p(z)=0$.

Enclose your proof in a `\begin{proof}...\end{proof}` environment.[^5]

Let $X$ be the set of all positive integers that are not interesting. Suppose, for the sake of contradiction, that $X\not=\emptyset$. By the well-ordering principle, $X$ contains a least element $a$. Note that $a$ is the first noninteresting number, but that’s interesting!
$\Rightarrow\Leftarrow$. Therefore, $X=\emptyset$ and so all positive integers are interesting.

Note that the end-of-proof symbol is automatically included. To show that a proof of a theorem is omitted, you can add an end-of-proof symbol yourself using the `\qed` command.

Let $x$ be an integer. Then $x$ is even if and only if $x+1$ is odd.

# Cross References

[sect:cross-ref]

## Labels for numbered entities

Numbered LaTeX structures can be given a label and we can use that label to refer to that structure. For example, this section is labeled using the command `\label{sect:cross-ref}`. That enables me to type
`Section~\ref{sect:cross-ref}` to produce “Section [sect:cross-ref]”. The tilde `~` is called a “tie” character. It produces a space but LaTeX won’t break the line at that point.

It is much better to use labels and references than to type in the section (or theorem or subsection or figure or equation) number yourself. If you change the document, the labels will change automatically.

You can use `\pageref` to give the page number on which the label can be found. For example, Theorem [thm:pyth] is on page . Don’t use this for journal submissions.

You can use `\eqref` to refer to equations; this command inserts the parentheses for you: The polynomial $g$ is defined in Equation .

## Citations

Most papers contain references. The best way to deal with references in LaTeX is as follows:

-   Have a separate bibtex file; the bibtex file for this paper is named
    `paper.bib`. The bibtex file contains all the information about the
    references but no formatting information. Examine the `paper.bib`
    file that accompanies this document.

-   At the end of the paper, please find these lines

        \bibliographystyle{plain}
        \bibliography{paper}

    The first specifies the bibliography style. (We chose “plain” but
    there are others available.) The second builds the actual References
    section of the paper.

-   Each entry in the bibtex file has a key name. For example, the key
    for Knuth’s *TeXbook* is `knuth84`. To include a reference in the
    paper to this book, we type `\cite{knuth84}` to give this: @knuth84.

-   Normally, only references that are cited with a `\cite` command
    appear in the paper’s bibliography. However, to coerce LaTeX to
    include *all* references in the bibtex file into your bibliography,
    include the command `\nocite{*}` just after the `\begin{document}`
    command.

To process the files `paper.tex` and `paper.bib`, run these commands on your computer:

    latex paper
    bibtex paper
    latex paper
    latex paper

# Figures

[sect:figures]

To incorporate a diagram into LaTeX you first prepare that diagram in a separate drawing program such as `xfig`, *Mathematica*, or Matlab. Save your illustration in `eps` format; let’s say the file is called
`doodle.eps`. We now want it to appear in our paper (as Figure [fig:doodle]).

[ht]

![image](doodle)

[fig:doodle]

The LaTeX code that make the figure appear is this:

    \begin{figure}[ht]
    \begin{center}
    \includegraphics[scale=0.5]{doodle}
    \end{center}
    \caption{A doodle created with the Xfig program.}
    \label{fig:doodle}
    \end{figure}

The optional `[ht]` means that the figure may appear either “Here” or else at the “Top” of the next page (if it doesn’t fit here). LaTeX takes these as suggestions and may decide to put your figure somewhere else if the figure is too big.

The optional `[scale=0.5]` shrinks the image by 50%. Try
`[width=\textwidth]` to make the figure exactly as wide as your text. Or
`[width=0.75\textwidth]` makes it $\frac34$ of the width of your text.

# Tables

Here are some simple examples of tables. Examine the source file to see how they are created.

  Left flush          Centered                 Right Flush
  -------------- ------------------- ---------------------
  Row 1           Middle of row one    right side of row I
  A second row         row \#2                          R2

|c||c|c|c|c| $x$ & 1 & 2 & 3 & 4\
$x^2$ & 1 & 4 & 9 & 16\

  **Term**            **Definition**
  ------------------- --------------------------------------------------------
  symmetric           a matrix equal to its own transpose
  singular            a matrix that is noninvertible
  doubly stochastic   a nonnegative matrix whose rows and columns sum to one

# Creating PDF Files

[sect:pdf]

The usual `latex` shell command produces a `.dvi` file. (For this document, typing the shell command `latex paper` produces a file named
`paper.dvi`.) It is possible to convert `paper.dvi` to a `pdf` with the shell command `dvipdf paper`, but this sometimes produces poor quality
`pdf` files.

A better method is simply to use `pdflatex` instead of `latex`. If your paper has no figures, everything will work fine. However, if your paper uses `.eps` files (as described in Section [sect:figures]) you need to do a bit more work. The command `\includegraphics{doodle}` looks for
`doodle.eps` when you run `latex`, but looks for `doodle.pdf` when you run `pdflatex`. To deal with this, you have two choices. First, if your drawing program allows you to save your figures as a `pdf` file, do it. Otherwise, you can convert the file `doodle.eps` to `pdf` format with the shell command `epstopdf doodle.eps`. Now you have both `doodle.eps` and `doodle.pdf` available so either version of LaTeX you use will be happy.

# Futher Reading

The canonical introduction to LaTeX is @lamport. I am particularly fond of the American Mathematics Society’s add-ons to LaTeX and these are documented in @amsldoc and @amsthdoc.

More advanced information can be found in @latex-companion,
@math-into-latex, and @kopka03. See also @latex-graphics for more on graphics and LaTeX.

The LaTeX system is built on top of Donald Knuth’s TeX; this is documented in @knuth84, but you probably won’t need to read this.

Searching for help on LaTeX and bibtex on the web is often fruitful.

Please note that some of the entries in the bibliography (look inside
`paper.bib`) are phony; they are included only to illustrate different types of bibliographic entries.

[^1]: Grant support listed here.

[^2]: On many keyboards, you will find the back tick character in the
    top row to the extreme left.

[^3]: For example, text in a footnote is automatically typeset smaller
    than text in the main body of the document.

[^4]: This requires the `amsmath` package; see @amsldoc.

[^5]: You need the `amsthm` package for this; see @amsldoc and
    @amsthdoc.
