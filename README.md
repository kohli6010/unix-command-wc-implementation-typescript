
# unix-command-wc-implementation-typescript

Coding Challenge #1 - Build your own wc! Complete Simple typescript implementation of the WC unix command.




## Installation

Simply Clone the repository, cd to it and follow the steps below to install and run this tool.

```bash
  npm Install
  npm run build
  npm install -g .
```

## How to use
Simply use command without any flags.
```bash
ccwc <filename>
```
this command will print line count, word count, byte size of file along with file name.

## Available flags
right now there are 4 flags.
- -w (word count of file)
- -l (line count of file)
- -c (byte size of file)
- -m (character count of file)

Example
```bash
ccwc -c test.txt
```
this will print byte size of file and accordingly other flags can be used.

## Use with streams
You can also use this with tools like **cat**.

Example
```bash
cat test.txt | ccwc
cat test.txt | ccwc -c
cat test.txt | ccwc -c -w
```

    