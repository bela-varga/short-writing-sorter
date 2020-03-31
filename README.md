# short-writing-sorter
Short Writing Sorter (SWS) is a place to write, categorize, and sort short texts.

## What is the goal of this thing?

I am a writer and among other things I write six-word-stories (in Hungarian, as [Béla, a gondolatébresztő](https://www.facebook.com/bela.a.gondolatebreszto/)).

I found hard to categorize hundreds of such short stories. There are questons like:
- Have I already written similar or exactly this?
- I would like to search for a positive/humorous one, how to find it?
- Have I already posted this one on my facebook page?
- In the upcuming book, where should this go?
- In the upcoming book, what order and how should these be?

I googled a little if there is a tool to do this. Maybe there is, but none of them was good enough for me. As I am a software engineer, I thought I write an own program to handle my very short writings.

So the main goal of this project is to be able to categorize my six-word-stories, sort them, label them, and create nice exports in the long run (for example a book in md format).

## Other use-cases

I realized that a program like this can categorize any short texts:
- quotes
- short funny gold quotes from family/colleagues
- short ideas
- six-word-stories

This is why I chose to create this in a public repository.

You can see json with quotes among the example json files.

## Current goals

Now I am in the starting phase of this project. That means _'quick and dirty'_.

At the moment I do not care about tests, super clean code, optimal solutions, etc.
Now I am basically building up a Proof of Concept.

I would like to reach a point where I can actually use this to save my already exising six-word-stories and be able to add new ones (even if I have to do the import/export manually in the start - copy-pasting into and from a textarea).

## Usage

See App.tsx

## Wishlist / ToDo list

- some refactor?
- add functionality to search all texts for a tag
- add functionality to search all texts for a category
- update searching by tags to search all texts for multiple tags
- update searching by tags to be able to search all texts that does not have a tag
- add functionality to show texts that are very similar (for example 5 words are the same from 6 words)
- use .env file(s) instead of commented code for personal json file(s) to load
- do some refactoring for App.tsx
- do some refactoring for ShortWritingManager
- change json version variable from number to version string
- optimize code to have less unneeded rendering
- maybe: try this with Svelte
- idea: variants for short texts: have multiple similar short texts under the same id, and always have a current winner that can be changed. That version is displayed for that short text.
