# draw2d webpack adaptation
webpack draw2d wrapper for modern use

## Installing
```
npm install -g draw2d-wrapper
```

## Usage

```
<script src="dist/draw2d-wrapper.js"  type="text/javascript"></script>
```
with webpack
```
require('draw2d-wrapper');
```
webpack, typescript
```
require('draw2d-wrapper');
...
let draw2d = (<any>window).draw2d;
```

