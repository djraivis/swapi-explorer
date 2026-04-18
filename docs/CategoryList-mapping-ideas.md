# React List Mapping: 10 Interesting Ideas

This note demonstrates 10 interesting things you can do when mapping over a list in React, using the example from `CategoryList.tsx`.

## Example List Mapping

```tsx
<ul>
  {items.map((item) => (
    <li key={item.url}>{item.name}</li>
  ))}
</ul>
```

---

## 1. Filter Items

Only show items that match a condition (e.g., exclude items with name "Luke Skywalker"):

```tsx
{
  items.filter((item) => item.name !== "Luke Skywalker").map((item) => <li key={item.url}>{item.name}</li>)
}
```

## 2. Sort Items

Sort items alphabetically before mapping:

```tsx
{
  ;[...items].sort((a, b) => a.name.localeCompare(b.name)).map((item) => <li key={item.url}>{item.name}</li>)
}
```

## 3. Add Conditional Styling

Highlight a special item:

```tsx
{
  items.map((item) => (
    <li key={item.url} style={{ fontWeight: item.name === "Luke Skywalker" ? "bold" : "normal" }}>
      {item.name}
    </li>
  ))
}
```

## 4. Add Icons or Badges

Show an emoji for droids:

```tsx
{
  items.map((item) => (
    <li key={item.url}>
      {item.name} {item.species === "Droid" && "🤖"}
    </li>
  ))
}
```

## 4. Spread Operator for Arrays

You can use the spread operator to create a new array by combining or extending arrays:

```js
const array = ["A", "B"]
const newArray = [...array, "C", "D", "E"]
console.log(array) // ['A', 'B']
console.log(newArray) // ['A', 'B', 'C', 'D', 'E']
```

This is useful for adding items to an array without mutating the original, which is a common pattern in React state updates.

---

## 5. Spread Operator for Objects

You can also use the spread operator to create a new object by copying properties from an existing object and adding or overriding properties:

```js
const object = { text: "Hello World" }
const newObject = { ...object, anotherText: "Test" }
console.log(object) // { text: 'Hello World' }
console.log(newObject) // { text: 'Hello World', anotherText: 'Test' }
```

This is useful for updating state objects in React in an immutable way.

## 6. Disable/Hide Links

Render some items as plain text:

```tsx
{
  items.map((item) => (
    <li key={item.url}>{item.isHidden ? item.name : <Link href={`/${category}/${item.url}`}>{item.name}</Link>}</li>
  ))
}
```

## 7. Add Tooltips

Show extra info on hover:

```tsx
{
  items.map((item) => (
    <li key={item.url} title={item.description}>
      {item.name}
    </li>
  ))
}
```

## 8. Group Items

Group by first letter:

```tsx
const grouped = items.reduce((acc, item) => {
  const letter = item.name[0].toUpperCase()
  acc[letter] = acc[letter] || []
  acc[letter].push(item)
  return acc
}, {})

Object.entries(grouped).map(([letter, group]) => (
  <div key={letter}>
    <h3>{letter}</h3>
    <ul>
      {group.map((item) => (
        <li key={item.url}>{item.name}</li>
      ))}
    </ul>
  </div>
))
```

## 9. Animate Items

Add a fade-in animation:

```tsx
{
  items.map((item, i) => (
    <li key={item.url} style={{ animation: `fadeIn 0.5s ${i * 0.1}s both` }}>
      {item.name}
    </li>
  ))
}
```

## 10. Track Clicks

Log when an item is clicked:

```tsx
{
  items.map((item) => (
    <li key={item.url}>
      <button onClick={() => console.log(item.name)}>{item.name}</button>
    </li>
  ))
}
```

## 11. Show Extra Details

Expand details on click:

```tsx
const [open, setOpen] = useState(null)

{
  items.map((item) => (
    <li key={item.url}>
      <button onClick={() => setOpen(open === item.url ? null : item.url)}>{item.name}</button>
      {open === item.url && <div>{item.details}</div>}
    </li>
  ))
}
```

---

Feel free to copy and adapt these patterns in your own components!
