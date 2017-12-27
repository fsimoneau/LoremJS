# LoremJS
Javascript library that generates Lorem Ipsum.

## How to use LoremJS

Get a text with 300 words :

```shell
LoremJS.get(300);
```

Get a text of 300 words in 4 paragraphs :

```shell
LoremJS.get(300, 4);
```


Get a text of 300 words and place it in the element with the id "myDiv" :

```shell
LoremJS.get(300, "#myDiv");
```


Get a text of 300 words and place it in all the elements with the class "testClass" :

```shell
LoremJS.get(300, ".testClass");
```

Get a text of 300 words in 4 paragraphs and place it in the element with the id "myDiv" :

```shell
LoremJS.get(300, 4, "#myDiv");
```
