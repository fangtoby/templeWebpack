<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dot.F Web HomePage</title>
    <link rel="stylesheet" type="text/css" href="./src/css/main.css">
</head>
<body>
    <header>
        <div class="h_title">
            <h1><span class="h_author">Dot.F</span>ront</h1>
        </div>
        <div class="h_menu">
            <ul>
                <li>
                    <a href="#">Document<span>(203)</span></a>
                </li>
                <li>
                    <a href="#">Graph<span>(1103)</span></a>
                </li>
                <li>
                    <a href="#">Library<span>(43)</span></a>
                </li>
                <li>
                    <a href="#">About</a>
                </li>
            </ul>
        </div>
    </header>
    <div class="content">
        <div class="doc_list">
            <div class="doc_list_title">
                <h2>动手编写一个编译器</h2>
            </div>
            <div class="doc_list_context">
                <a href="javascript:void(0);" class="show_pop">show pop</a>
                <a href="javascript:void(0);" class="close_pop">close pop</a>
                <p>
                    动手编写一个编译器，学习一下较为底层的编程方式，是一种学习计算机到底是如何工作的非常有效方法。

        编译器通常被看作是十分复杂的工程。事实上，编写一个产品级的编译器也确实是一个庞大的任务。但是写一个小巧可用的编译器却不是这么困难。

        秘诀就是首先去找到一个最小的可用工程，然后把你想要的特性添加进去。这个方法也是Abdulaziz Ghuloum在他那篇著名的论文“一种构造编译器的捷径”里所提到的办法。不过这个办法确实可行。你只需要按照这篇论文中的第一步来操作，就可以得到一个真正可用的编译器！当然，它只能编译程序语言中的非常小的子集，但是它确实是一个真实可用的编译器。你可以随意的扩展这个编译器，然后从中学到更多更深的知识。

        受到这篇文章的鼓舞，我就写了一个C编译器。从某种意义上来说这比写一个scheme的编译器要困难一些（因为你必须去解析C那复杂的语法），但是在某些方面又很便利（你不需要去处理运行时类型）。要写这样一个编译器，你只需要从你那个可用的最小的编译器开始。

        对于我写的编译器来说，我把它叫 babyc，我选了这段代码来作为我需要运行的第一个程序：
                </p>
            </div>
        </div>
    </div>
    <footer>
        <div class="f_copyright">
            <p>
                &copy;2015-<a href="" class="f_author">Dot.f</a>
            </p>
        </div>
    </footer>
    <script type="text/javascript" src="/assets/js/lib/common.js"></script>
    <script type="text/javascript" src="/assets/js/index/index.js"></script>
</body>
</html>