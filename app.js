//heading => react element and react element is basically a javascript object
/**
 * ReactElement(Object) =>HTML(Browser Understands)
 * 
 * 
 * 
 * 
 */
const heading = React.createElement("h1",
 {
  id: "heading"
}, "Hello World"); //{} => use to give attribute in the class
console.log(heading);

const parent = React.createElement(
    "div",{id:"parent"},
[React.createElement("div",{id:"child"},
[
React.createElement("h1",{},"I'm an h1 tag"),
React.createElement("h2",{},"I'm an h2 tag"),
]),React.createElement("div",{id:"child2"},
[
React.createElement("h1",{},"I'm an h1 tag"),
React.createElement("h2",{},"I'm an h2 tag"),
])]

);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(heading);
root.render(parent);