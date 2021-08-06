---
title: This is the title
hero: crap.jpg
---

<script lang="ts">
import Timer from '$lib/Timer.svelte'
import Counter from '$lib/Counter.svelte'
</script>

_Photo by [CRYSTALWEED cannabis](https://unsplash.com/@crystalweed?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/t/food-drink?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)._

<!-- @classes boo artboard artboard-demo -->

![second image](./crap.jpg?boo 'this is a title')

> ![second image](./crap.jpg?boo 'this is a title')
> Boo

Some text

- a
- short
- list

http://google.com/

<Timer />
<Counter />

```yaml
boo: 'baaaa'
foo:
  - xxxx: true
```

```js {frak}
import { getHighlighter as configureShiki } from 'shiki'

const shiki = configureShiki({
  theme: 'nord',
})

export const highlight = async (code, lang) => {
  const { codeToHtml } = await shiki
  return codeToHtml(code, lang)
}
```
