# node-build
[![npm version](https://img.shields.io/npm/v/@archivist/build.svg)](https://www.npmjs.com/package/@archivist/build)

Archivist Nerd's build: a VERY simple little build source system

> helps you a VERY simple little build source system


## Installation

```sh
npm install @archivist/build
```

## Example command

```sh
build ./src/.build
```

## Example ".build" file

```text
# .build file
#     all file reads are based on the common path of the build file
#     all file writes are based on the current path
-----------------------
      build.js
!S    # remove-comments
>>    ./build.js
-----------------------
      cli.js
!S    # remove-comments
>>    ./cli.js
-----------------------
```

## License

MIT