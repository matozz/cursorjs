# Cursor.js

<div style="display:flex;flex-wrap:wrap; gap:10px;margin:20px 0">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/matozz/cursorjs"/>
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/matozz/cursorjs"/>
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/size/matozz/cursorjs/dist/bundle.js"/>
    <img alt="npm" src="https://img.shields.io/npm/v/@matoz/cursorjs"/>
</div>

iPadOS provides dynamic pointer effects and behaviors that enhance the experience of using a pointing device with iPad.
This experimental library help you to achieve this amazing effect.

[Design - Pointers (iPadOS)](https://developer.apple.com/design/human-interface-guidelines/ios/user-interaction/pointers/)

[Demo Page](https://cursorjs.vercel.app) (Download the [Source File](https://github.com/Matozz/cursorjs/blob/master/example.html))

![](https://og-image.vercel.app/**Cursor**.js.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2Fremojansen%2Flogo.ts%40master%2Fts.svg)

## How to use

1. Use `<script>` tag to load Cursor.js in your HTML file：

- UNPKG CDN:

```html
<script src="//unpkg.com/@matoz/cursorjs" defer></script>
```

- jsDelivr CDN:

```html
<script src="//cdn.jsdelivr.net/npm/@matoz/cursorjs" defer></script>
```
2. Follow the exmaples below.

## Supported Effect:


### Highlight effect:
![Highlight](.github/Highlight.gif)
```html
<button>
  <img src="./assets/airplay.svg" style="margin-right: 6px" />
  Airplay
</button>
<button>Material</button>
<button>Cursor</button>
<button>😂</button>
<button>😊</button>
```
> This experimental version will only work  with the default internal button style, we will make the button customizable in future release. 

### Lift effect:
![Lift](.github/Lift.gif)
```html
<img class="icon" id="icon" src="./assets/Message.svg" alt="Message" />
<img class="icon" id="icon" src="./assets/Phone.svg" alt="Phone" />
```
> Simply add `id="icon"` attribute to `<img>` tag 

### Content effect:
![Content](.github/Content.gif)
```html
<p>
  With a content effect, the UI element or region beneath the pointer can
  also change its appearance when the pointer hovers over it.
</p>
```
> Since there is no way to get each line of text, you need to manually set each line.


### More effects...

## Contribute

Feel free to fork this repository and submit pull requests. Bugs report in [GitHub Issues](https://github.com/matozz/cursorjs/issues).

## License

Cursor.js is [MIT Licensed](LICENSE).