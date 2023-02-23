# Test-Driven Development

Hello! This repository shows a practical example of how to use TDD to develop an application given
some requirements.

The principles behind the tests and application design here are driven by what Ian Cooper advises in
his `TDD: Where Did It All Go Wrong?` video. [Seriously: watch it](https://www.youtube.com/watch?v=EZ05e7EMOLM).

[NO, SERIOUSLY: WATCH IT](https://www.youtube.com/watch?v=EZ05e7EMOLM).

What Ian says in that video is how these tests have been constructed, and its joyous to work in this way :)

## Requirements Implemented

1. We need a way to store musicians and their best songs.
    - A musician only needs their `name` and `best song` to be stored. 
    - There should only be one entry for each musician.
2. We need a way to retrieve a musician and their best song based on their name.
3. We want to allow upvotes on an entry.

## Directory/file structure

Note that the files are organised into `src` and `tests` at the top level to denote source code and
test code, respectively.

### src

Directories within the `src` directory are organised by domain concepts, rather than class functions.
These directories are intended to create a set of layers, or stack for the domain concept. The 
sub-directories are intended to define the following structure:

```text
                           THE WEB
                              ^
          | --------- |       |       | --------- |
          |  DOMAIN   |       |       |  DOMAIN   |
          | CONCEPT X |      / \      | CONCEPT Y |
          | --------- |     /   \     | --------- |
PORTS     | REST Port |<----     ---->| Rest Port |
          | ----^---- |               | ----^---- |
          |     |     |               |     |     |
          | ----v---- |               | ----v---- |
PUBLIC    |  Service  |<---Concept--->|  Service  |
          | ----^---- |               | ----^---- |
          |     |     |               |     |     |
          | ----v---- |               | ----v---- |
PRIVATE   | Repository|               | Repository|
          | --------- |               | --------- |
```

What this diagram is trying to convey is a combination of domain-driven design (domain concepts), 
hexagonal architecture (`Ports`), and a layered/stratified architecture (`Ports`, `Public`, `Private`).
The layers in each stack can evolve in isolation and may contain more than just one module in each layer.

I call these stacks "domain stacks" and they are there to promote encapsulation. If you follow this
architecture, you'll essentially end up with a modular-monolith. Here I'm suggesting an architecture where:

1. Other systems outside the app call-in via the `Ports` layer. Ports from different domain stacks don't talk to one 
another, but do talk to the next immediate layer down in the stack; the `Public` modules. `Port` modules are usually
[integration modules](https://ralfwestphal.substack.com/p/integration-operation-segregation).
1. `Public` modules are so-called because these modules can talk across domain stack boundaries so are "public"
from the perspective of the application's domain stacks. Modules within this structure are usually 
high-level interfaces that expose operations that can be performed in context of a domain concept. They are 
usually [integration modules](https://ralfwestphal.substack.com/p/integration-operation-segregation). Public
modules can also talk to layers below them, and they can respond to the modules in the "ports" layer above.
You could think of these as a specialisation of the [service layer pattern](https://martinfowler.com/eaaCatalog/serviceLayer.html)
1. `Private` modules are so-called because these modules don't talk across domain stack boundaries. They are only
able to call other `Private` modules, or respond to the `Public` modules within their own domain stack. They are
usually [operation or hybrid modules](https://ralfwestphal.substack.com/p/integration-operation-segregation).

### tests

https://youtu.be/e7dx2Z9G7Mk?t=18

OK but, in all seriousness, this is where the business is. Some technical details first:

- Tests are written and run using the [Jest](https://jestjs.io/) framework. There's no special reason 
for this, its just what I'm comfortable with at the moment in Javascript!

- [testcontainers](https://www.testcontainers.org/) are used in all tests. This is because TDD should be
testing the public interface of a module and, for a web application, this is the REST API. Yes, I know,
some of you may want to fight on this but please, watch [this](https://www.youtube.com/watch?v=EZ05e7EMOLM).

#### external-dependencies

Contains external dependencies that can be set-up as containers for use during testing by `testcontainers`.