## Logic

A game has a grid of NxN squares, accessible by cartesian coordinates (implemented as a Vector type)

### State 
A game has a player:

    - The game grid must know the player's position.
    - The game grid must know the position of various actors.
    - The game must track the player's state


A game has other stateful actors (enemies, bosses)

A game must have turns

A game has power ups, health, weapons

The player controls their character with the arrow keys

A collision with an enemy must deplete both the player and the CPU's health over turns.


The grid stores an array of actors of various types
    - Player
    - baddies
    - power ups 
    - weapons

It tracks the player's position, and checks for collisions each time the player moves

GRID 
    getSquare
    setSquare

    [array of actors and positions]

ACTORS

